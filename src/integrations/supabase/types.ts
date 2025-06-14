export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      component_variants: {
        Row: {
          code_example: string | null
          component_id: string | null
          created_at: string
          id: string
          name: string
          preview_url: string | null
          props: Json | null
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          code_example?: string | null
          component_id?: string | null
          created_at?: string
          id?: string
          name: string
          preview_url?: string | null
          props?: Json | null
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          code_example?: string | null
          component_id?: string | null
          created_at?: string
          id?: string
          name?: string
          preview_url?: string | null
          props?: Json | null
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "component_variants_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: false
            referencedRelation: "components"
            referencedColumns: ["id"]
          },
        ]
      }
      components: {
        Row: {
          category_id: string | null
          created_at: string
          description: string | null
          figma_url: string | null
          id: string
          is_experimental: boolean | null
          name: string
          slug: string
          sort_order: number | null
          status: Database["public"]["Enums"]["component_status"] | null
          storybook_url: string | null
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          figma_url?: string | null
          id?: string
          is_experimental?: boolean | null
          name: string
          slug: string
          sort_order?: number | null
          status?: Database["public"]["Enums"]["component_status"] | null
          storybook_url?: string | null
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          figma_url?: string | null
          id?: string
          is_experimental?: boolean | null
          name?: string
          slug?: string
          sort_order?: number | null
          status?: Database["public"]["Enums"]["component_status"] | null
          storybook_url?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "components_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_fonts: {
        Row: {
          created_at: string
          created_by: string | null
          font_family: string
          font_files: Json
          font_name: string
          google_font_url: string | null
          id: string
          is_google_font: boolean | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          font_family: string
          font_files?: Json
          font_name: string
          google_font_url?: string | null
          id?: string
          is_google_font?: boolean | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          font_family?: string
          font_files?: Json
          font_name?: string
          google_font_url?: string | null
          id?: string
          is_google_font?: boolean | null
        }
        Relationships: []
      }
      design_system_versions: {
        Row: {
          brand_name: string | null
          color_palette: Json
          created_at: string
          created_by: string | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          typography: Json
          updated_at: string
          version_name: string
        }
        Insert: {
          brand_name?: string | null
          color_palette?: Json
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          typography?: Json
          updated_at?: string
          version_name: string
        }
        Update: {
          brand_name?: string | null
          color_palette?: Json
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          typography?: Json
          updated_at?: string
          version_name?: string
        }
        Relationships: []
      }
      design_tokens: {
        Row: {
          category_id: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          sort_order: number | null
          token_type: Database["public"]["Enums"]["token_type"]
          updated_at: string
          value: Json
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          sort_order?: number | null
          token_type: Database["public"]["Enums"]["token_type"]
          updated_at?: string
          value: Json
        }
        Update: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          sort_order?: number | null
          token_type?: Database["public"]["Enums"]["token_type"]
          updated_at?: string
          value?: Json
        }
        Relationships: [
          {
            foreignKeyName: "design_tokens_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      documentation: {
        Row: {
          component_id: string | null
          content: string
          created_at: string
          id: string
          section: string | null
          sort_order: number | null
          title: string
          updated_at: string
        }
        Insert: {
          component_id?: string | null
          content: string
          created_at?: string
          id?: string
          section?: string | null
          sort_order?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          component_id?: string | null
          content?: string
          created_at?: string
          id?: string
          section?: string | null
          sort_order?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "documentation_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: false
            referencedRelation: "components"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          role: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_invitations: {
        Row: {
          accepted_at: string | null
          created_at: string
          email: string
          expires_at: string
          id: string
          invited_by: string
          role: Database["public"]["Enums"]["app_role"]
          token: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          email: string
          expires_at?: string
          id?: string
          invited_by: string
          role?: Database["public"]["Enums"]["app_role"]
          token: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          invited_by?: string
          role?: Database["public"]["Enums"]["app_role"]
          token?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      accept_invitation: {
        Args: { invitation_token: string }
        Returns: Json
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      component_status: "draft" | "review" | "stable" | "deprecated"
      theme_mode: "light" | "dark" | "auto"
      token_type:
        | "color"
        | "typography"
        | "spacing"
        | "shadow"
        | "radius"
        | "motion"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      component_status: ["draft", "review", "stable", "deprecated"],
      theme_mode: ["light", "dark", "auto"],
      token_type: [
        "color",
        "typography",
        "spacing",
        "shadow",
        "radius",
        "motion",
      ],
    },
  },
} as const
