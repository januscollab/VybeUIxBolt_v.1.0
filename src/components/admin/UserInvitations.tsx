import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Mail, Calendar, Check, X, Trash2, Shield, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { validateEmail } from '@/lib/validation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function UserInvitations() {
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<'user' | 'admin'>('user');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [invitations, setInvitations] = useState<any[]>([]);
  const { toast } = useToast();

  const sendInvitation = async () => {
    if (!email) return;
    
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
          role: selectedRole,
          token,
          invited_by: (await supabase.auth.getUser()).data.user?.id
        });

      if (error) throw error;

      toast({
        title: "Invitation sent",
        description: `${selectedRole === 'admin' ? 'Admin' : 'User'} invitation sent to ${email}`,
      });
      
      setEmail('');
      loadData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send invitation",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const loadData = async () => {
    // Load users with roles
    const { data: usersData } = await supabase
      .from('profiles')
      .select(`
        *,
        user_roles (role)
      `)
      .order('created_at', { ascending: false });

    // Load pending invitations
    const { data: invitationsData } = await supabase
      .from('user_invitations')
      .select('*')
      .is('accepted_at', null)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false });
    
    if (usersData) setUsers(usersData);
    if (invitationsData) setInvitations(invitationsData);
  };

  const changeUserRole = async (userId: string, newRole: 'user' | 'admin') => {
    setLoading(true);
    try {
      // Remove existing roles
      await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      // Add new role
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: userId, role: newRole });

      if (error) throw error;

      toast({
        title: "Role updated",
        description: `User role changed to ${newRole}`,
      });
      
      loadData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const removeUser = async (userId: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      if (error) throw error;

      toast({
        title: "User removed",
        description: "User access has been removed",
      });
      
      loadData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove user",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const cancelInvitation = async (invitationId: string) => {
    try {
      const { error } = await supabase
        .from('user_invitations')
        .delete()
        .eq('id', invitationId);

      if (error) throw error;

      toast({
        title: "Invitation cancelled",
        description: "Invitation has been cancelled",
      });
      
      loadData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel invitation",
        variant: "destructive",
      });
    }
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const getCurrentUserRole = (user: any) => {
    return user.user_roles?.[0]?.role || 'user';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Manage Readers
        </CardTitle>
        <CardDescription>
          Manage user access and permissions for your design system
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium">Invite New User</h4>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendInvitation()}
              className="flex-1"
            />
            <Select value={selectedRole} onValueChange={(value: 'user' | 'admin') => setSelectedRole(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={sendInvitation} disabled={loading || !email}>
              <Mail className="h-4 w-4 mr-2" />
              Invite
            </Button>
          </div>
        </div>

        {users.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium">Current Users</h4>
            <div className="space-y-2">
              {users.map((user) => {
                const userRole = getCurrentUserRole(user);
                return (
                  <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {userRole === 'admin' ? (
                        <Shield className="h-4 w-4 text-primary" />
                      ) : (
                        <User className="h-4 w-4 text-muted-foreground" />
                      )}
                      <div>
                        <div className="text-sm font-medium">{user.full_name || user.email}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select 
                        value={userRole} 
                        onValueChange={(value: 'user' | 'admin') => changeUserRole(user.id, value)}
                        disabled={loading}
                      >
                        <SelectTrigger className="w-20 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeUser(user.id)}
                        disabled={loading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {invitations.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium">Pending Invitations</h4>
            <div className="space-y-2">
              {invitations.map((invitation) => (
                <div key={invitation.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">{invitation.email}</div>
                      <div className="text-xs text-muted-foreground">
                        Invited as {invitation.role} • Expires {new Date(invitation.expires_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      <Calendar className="h-3 w-3 mr-1" />
                      Pending
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => cancelInvitation(invitation.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}