export type ContactDatabase = {
  __InternalSupabase: {
    PostgrestVersion: "12";
  };
  public: {
    Tables: {
      enquiries: {
        Row: {
          id: string;
          created_at: string;
          full_name: string;
          email: string;
          subject: string;
          service_slug: string;
          budget_range: string | null;
          message: string;
          status: string;
          ip_hash: string;
          user_agent: string | null;
          email_sent: boolean;
          email_error: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          full_name: string;
          email: string;
          subject: string;
          service_slug: string;
          budget_range?: string | null;
          message: string;
          status?: string;
          ip_hash: string;
          user_agent?: string | null;
          email_sent?: boolean;
          email_error?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          full_name?: string;
          email?: string;
          subject?: string;
          service_slug?: string;
          budget_range?: string | null;
          message?: string;
          status?: string;
          ip_hash?: string;
          user_agent?: string | null;
          email_sent?: boolean;
          email_error?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
