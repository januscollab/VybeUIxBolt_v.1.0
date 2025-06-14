import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, colorPalette, typography, components } = await req.json()
    
    // Get Figma API token from environment
    const figmaToken = Deno.env.get('FIGMA_API_TOKEN')
    if (!figmaToken) {
      throw new Error('Figma API token not configured')
    }

    // Create new Figma file
    const createFileResponse = await fetch('https://api.figma.com/v1/files', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${figmaToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name || 'Design System',
        node_type: 'CANVAS'
      })
    })

    if (!createFileResponse.ok) {
      throw new Error('Failed to create Figma file')
    }

    const fileData = await createFileResponse.json()
    const fileKey = fileData.key

    // Create color styles
    const colorStyles = Object.entries(colorPalette || {}).map(([name, hex]) => ({
      name: `Colors/${name}`,
      fills: [{
        type: 'SOLID',
        color: hexToRgb(hex as string)
      }]
    }))

    // Create text styles
    const textStyles = Object.entries(typography || {}).map(([name, config]: [string, any]) => ({
      name: `Typography/${name}`,
      fontFamily: config.family || 'Inter',
      fontSize: parseInt(config.size) || 16,
      fontWeight: config.weight || 400
    }))

    // Apply styles to file (simplified for demo)
    const updateResponse = await fetch(`https://api.figma.com/v1/files/${fileKey}/styles`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${figmaToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        color_styles: colorStyles,
        text_styles: textStyles
      })
    })

    const fileUrl = `https://www.figma.com/file/${fileKey}/${encodeURIComponent(name || 'Design System')}`

    return new Response(
      JSON.stringify({ 
        success: true, 
        fileKey,
        fileUrl,
        message: 'Figma file created successfully'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : { r: 0, g: 0, b: 0 }
}