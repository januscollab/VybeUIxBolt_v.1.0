import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Mail, Calendar, Check, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { validateEmail } from '@/lib/validation';

export function UserInvitations() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [invitations, setInvitations] = useState<any[]>([]);
  const { toast } = useToast();

  const sendInvitation = async () => {
    if (!email) return;
    
    // Validate email format and security constraints
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      toast({
        title: "Invalid Email",
        description: emailValidation.error || "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    try {
      const token = crypto.randomUUID();
      const { error } = await supabase
        .from('user_invitations')
        .insert({
          email,
          role: 'user',
          token,
          invited_by: (await supabase.auth.getUser()).data.user?.id
        });

      if (error) throw error;

      toast({
        title: "Invitation sent",
        description: `Invitation sent to ${email}`,
      });
      
      setEmail('');
      loadInvitations();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send invitation",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const loadInvitations = async () => {
    const { data } = await supabase
      .from('user_invitations')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setInvitations(data);
  };

  React.useEffect(() => {
    loadInvitations();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Invite Readers
        </CardTitle>
        <CardDescription>
          Invite users to view your design system as readers (view-only access)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendInvitation()}
          />
          <Button onClick={sendInvitation} disabled={loading || !email}>
            <Mail className="h-4 w-4 mr-2" />
            Invite
          </Button>
        </div>

        {invitations.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Recent Invitations</h4>
            {invitations.slice(0, 5).map((invitation) => (
              <div key={invitation.id} className="flex items-center justify-between p-2 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{invitation.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  {invitation.accepted_at ? (
                    <Badge variant="default" className="text-xs">
                      <Check className="h-3 w-3 mr-1" />
                      Accepted
                    </Badge>
                  ) : new Date(invitation.expires_at) > new Date() ? (
                    <Badge variant="secondary" className="text-xs">
                      <Calendar className="h-3 w-3 mr-1" />
                      Pending
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="text-xs">
                      <X className="h-3 w-3 mr-1" />
                      Expired
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}