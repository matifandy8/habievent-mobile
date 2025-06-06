export type Event = {
    id: string;
    event_name: string;
    event_type?: string;
    event_time: string;
    location?: string;
    category?: string;
    link?: string;
    notes?: string;
    user_id?: string;
};