export interface EventMaintenance {
  importance: 'critical' | 'warning' | 'normal';
  description: string;
  id: string;
  date: Date;
}

export interface CardDay {
  events: EventMaintenance[];
  date: Date;
}

export interface Equipment {
  nextMaintenance: Date;
  imageUrl: string;
  status: string;
  name: string;
  id: string;
}