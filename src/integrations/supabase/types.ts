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
      admin_users: {
        Row: {
          created_at: string
          id: string
          updated_at: string
          username: string
        }
        Insert: {
          created_at?: string
          id?: string
          updated_at?: string
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      assignment_reports: {
        Row: {
          assignment_key: string
          created_at: string
          id: string
          level: number
          topic_index: number
          topic_name: string
          user_id: string
        }
        Insert: {
          assignment_key: string
          created_at?: string
          id?: string
          level: number
          topic_index: number
          topic_name: string
          user_id: string
        }
        Update: {
          assignment_key?: string
          created_at?: string
          id?: string
          level?: number
          topic_index?: number
          topic_name?: string
          user_id?: string
        }
        Relationships: []
      }
      daily_topic_activations: {
        Row: {
          activated_at: string
          created_at: string
          day_index: number
          id: string
          topic_index: number
          topic_key: string
          user_id: string
        }
        Insert: {
          activated_at?: string
          created_at?: string
          day_index: number
          id?: string
          topic_index: number
          topic_key: string
          user_id: string
        }
        Update: {
          activated_at?: string
          created_at?: string
          day_index?: number
          id?: string
          topic_index?: number
          topic_key?: string
          user_id?: string
        }
        Relationships: []
      }
      leaderboard: {
        Row: {
          city: string | null
          created_at: string
          id: string
          max_possible_score: number
          player_name: string
          score: number
        }
        Insert: {
          city?: string | null
          created_at?: string
          id?: string
          max_possible_score?: number
          player_name: string
          score: number
        }
        Update: {
          city?: string | null
          created_at?: string
          id?: string
          max_possible_score?: number
          player_name?: string
          score?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          email_preferences: string | null
          full_name: string | null
          id: string
          preferred_language: string | null
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email_preferences?: string | null
          full_name?: string | null
          id: string
          preferred_language?: string | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email_preferences?: string | null
          full_name?: string | null
          id?: string
          preferred_language?: string | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      spotify_connections: {
        Row: {
          access_token: string
          created_at: string
          expires_at: number
          id: string
          refresh_token: string
          scope: string
          token_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token: string
          created_at?: string
          expires_at: number
          id?: string
          refresh_token: string
          scope: string
          token_type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string
          created_at?: string
          expires_at?: number
          id?: string
          refresh_token?: string
          scope?: string
          token_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      topic_activations: {
        Row: {
          activated_at: string
          created_at: string
          id: string
          topic_index: number
          topic_key: string
          user_id: string
        }
        Insert: {
          activated_at?: string
          created_at?: string
          id?: string
          topic_index: number
          topic_key: string
          user_id: string
        }
        Update: {
          activated_at?: string
          created_at?: string
          id?: string
          topic_index?: number
          topic_key?: string
          user_id?: string
        }
        Relationships: []
      }
      unlock_all_activated: {
        Row: {
          created_at: string
          id: string
          index_activated: number
          time: string
          username: string
        }
        Insert: {
          created_at?: string
          id?: string
          index_activated: number
          time?: string
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          index_activated?: number
          time?: string
          username?: string
        }
        Relationships: []
      }
      unsubscribe_tokens: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          token: string
          token_type: string
          used_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          token: string
          token_type: string
          used_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          token?: string
          token_type?: string
          used_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_description: string | null
          achievement_key: string
          achievement_name: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          achievement_description?: string | null
          achievement_key: string
          achievement_name: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          achievement_description?: string | null
          achievement_key?: string
          achievement_name?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_email_tracking: {
        Row: {
          clicks: number | null
          created_at: string
          email_type: string
          id: string
          opens: number | null
          sent_at: string
          subject: string | null
          user_id: string
        }
        Insert: {
          clicks?: number | null
          created_at?: string
          email_type: string
          id?: string
          opens?: number | null
          sent_at?: string
          subject?: string | null
          user_id: string
        }
        Update: {
          clicks?: number | null
          created_at?: string
          email_type?: string
          id?: string
          opens?: number | null
          sent_at?: string
          subject?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_engagement: {
        Row: {
          assignments_completed: number
          created_at: string
          date: string
          id: string
          sessions_count: number
          time_spent_minutes: number
          updated_at: string
          user_id: string
        }
        Insert: {
          assignments_completed?: number
          created_at?: string
          date: string
          id?: string
          sessions_count?: number
          time_spent_minutes?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          assignments_completed?: number
          created_at?: string
          date?: string
          id?: string
          sessions_count?: number
          time_spent_minutes?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          assignments_completed: number | null
          duration_minutes: number | null
          id: string
          page_views: number | null
          session_end: string | null
          session_start: string
          user_id: string
        }
        Insert: {
          assignments_completed?: number | null
          duration_minutes?: number | null
          id?: string
          page_views?: number | null
          session_end?: string | null
          session_start?: string
          user_id: string
        }
        Update: {
          assignments_completed?: number | null
          duration_minutes?: number | null
          id?: string
          page_views?: number | null
          session_end?: string | null
          session_start?: string
          user_id?: string
        }
        Relationships: []
      }
      user_streaks: {
        Row: {
          created_at: string
          current_streak: number
          id: string
          last_activity_date: string
          longest_streak: number
          streak_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_streak?: number
          id?: string
          last_activity_date: string
          longest_streak?: number
          streak_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_streak?: number
          id?: string
          last_activity_date?: string
          longest_streak?: number
          streak_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_unsubscribe_token: {
        Args: { _user_id: string; _token_type: string }
        Returns: string
      }
      get_assignment_progress_timeline: {
        Args: { _user_id: string; _start_date?: string }
        Returns: {
          date: string
          daily_completed: number
          cumulative_total: number
        }[]
      }
      update_daily_engagement: {
        Args: {
          _user_id: string
          _date?: string
          _session_increment?: number
          _time_increment?: number
          _assignments_increment?: number
        }
        Returns: undefined
      }
      update_user_streaks: {
        Args: { _user_id: string }
        Returns: undefined
      }
      use_unsubscribe_token: {
        Args: { _token: string }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
