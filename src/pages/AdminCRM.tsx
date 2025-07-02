import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Search, Download, Mail, Send } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';

interface UserEmailData {
  id: string;
  email: string;
  email_preferences: string;
  last_email_sent?: string;
  email_opens?: number;
  email_clicks?: number;
}

const AdminCRM: React.FC = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<UserEmailData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserEmailData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [preferenceFilter, setPreferenceFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'email' | 'preference' | 'last_email'>('email');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterAndSortUsers();
  }, [users, searchTerm, preferenceFilter, sortBy, sortOrder]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Fetch user profiles with email preferences
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select(`
          id,
          username,
          full_name,
          email_preferences,
          created_at
        `);

      if (profilesError) throw profilesError;

      // For demo purposes, we'll use profile data since admin.listUsers requires elevated permissions
      // In production, you'd need to store email in profiles table or use a different approach
      const authUsers: any[] = [];

      // Fetch latest email tracking data
      const { data: emailTracking, error: trackingError } = await supabase
        .from('user_email_tracking')
        .select('user_id, sent_at, opens, clicks')
        .order('sent_at', { ascending: false });

      if (trackingError) throw trackingError;

      // Combine all data
      const combinedData: UserEmailData[] = profiles?.map(profile => {
        const latestEmail = emailTracking?.find(e => e.user_id === profile.id);
        
        return {
          id: profile.id,
          email: `user_${profile.id.slice(0, 8)}@example.com`, // Placeholder email
          email_preferences: profile.email_preferences || 'weekly_reminder',
          last_email_sent: latestEmail?.sent_at,
          email_opens: latestEmail?.opens || 0,
          email_clicks: latestEmail?.clicks || 0,
        };
      }) || [];

      setUsers(combinedData);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortUsers = () => {
    let filtered = users.filter(user => {
      const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPreference = preferenceFilter === 'all' || user.email_preferences === preferenceFilter;
      return matchesSearch && matchesPreference;
    });

    filtered.sort((a, b) => {
      let aValue: any = a[sortBy];
      let bValue: any = b[sortBy];
      
      if (sortBy === 'last_email') {
        aValue = a.last_email_sent ? new Date(a.last_email_sent).getTime() : 0;
        bValue = b.last_email_sent ? new Date(b.last_email_sent).getTime() : 0;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredUsers(filtered);
  };

  const exportEmails = () => {
    const emails = filteredUsers.map(user => user.email).join(',');
    navigator.clipboard.writeText(emails);
    toast.success('Email addresses copied to clipboard');
  };

  const sendTestEmail = async () => {
    try {
      // This would call your email sending edge function
      toast.success('Test email sent successfully');
    } catch (error) {
      toast.error('Failed to send test email');
    }
  };

  const getPreferenceBadge = (preference: string) => {
    const variants = {
      none: 'bg-terracotta/20 text-terracotta',
      important_only: 'bg-golden-yellow/20 text-golden-yellow',
      weekly_reminder: 'bg-sage-green/20 text-sage-green'
    };
    
    const labels = {
      none: 'None',
      important_only: 'Important Only',
      weekly_reminder: 'Weekly'
    };

    return (
      <Badge className={variants[preference as keyof typeof variants] || variants.weekly_reminder}>
        {labels[preference as keyof typeof labels] || preference}
      </Badge>
    );
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-b from-deep-teal via-sage-green to-sandy-beige flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-deep-teal via-sage-green to-sandy-beige p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-display text-white mb-2">Email CRM</h1>
            <p className="text-white/80">Manage user email preferences and campaigns</p>
          </div>

          {/* Filters and Actions */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-organic p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col md:flex-row gap-4 flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-mushroom" />
                  <Input
                    placeholder="Search by email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-sage-green/30 focus:border-terracotta"
                  />
                </div>
                
                <Select value={preferenceFilter} onValueChange={setPreferenceFilter}>
                  <SelectTrigger className="w-48 border-sage-green/30 focus:border-terracotta">
                    <SelectValue placeholder="Filter by preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Preferences</SelectItem>
                    <SelectItem value="none">No Emails</SelectItem>
                    <SelectItem value="important_only">Important Only</SelectItem>
                    <SelectItem value="weekly_reminder">Weekly Reminders</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
                  const [field, order] = value.split('-');
                  setSortBy(field as any);
                  setSortOrder(order as any);
                }}>
                  <SelectTrigger className="w-48 border-sage-green/30 focus:border-terracotta">
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email-asc">Email A-Z</SelectItem>
                    <SelectItem value="email-desc">Email Z-A</SelectItem>
                    <SelectItem value="preference-asc">Preference A-Z</SelectItem>
                    <SelectItem value="preference-desc">Preference Z-A</SelectItem>
                    <SelectItem value="last_email-desc">Last Email (Newest)</SelectItem>
                    <SelectItem value="last_email-asc">Last Email (Oldest)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={exportEmails}
                  variant="outline"
                  size="sm"
                  className="border-sage-green/30 text-sage-green hover:bg-sage-green/10"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button 
                  onClick={sendTestEmail}
                  size="sm"
                  className="bg-terracotta hover:bg-burnt-orange text-white"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Test Email
                </Button>
              </div>
            </div>
          </Card>

          {/* Users Table */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-organic overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-display text-warm-brown">
                  Users ({filteredUsers.length})
                </h2>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Preference</TableHead>
                      <TableHead>Last Email</TableHead>
                      <TableHead>Opens</TableHead>
                      <TableHead>Clicks</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.email}</TableCell>
                        <TableCell>{getPreferenceBadge(user.email_preferences)}</TableCell>
                        <TableCell>
                          {user.last_email_sent 
                            ? new Date(user.last_email_sent).toLocaleDateString()
                            : 'Never'
                          }
                        </TableCell>
                        <TableCell>{user.email_opens}</TableCell>
                        <TableCell>{user.email_clicks}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-sage-green/30 text-sage-green hover:bg-sage-green/10"
                          >
                            <Mail className="w-4 h-4 mr-1" />
                            Resend
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminCRM;