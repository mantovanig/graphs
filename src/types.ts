export interface ExtraInfo {
  quiz_session_type?: string | null;
  priority?: number | null;
  score_delta?: number | null;
  quiz_session?: number | null;
  quiz_config?: number | null;
  quiz_config_title?: string | null;
}
export interface GraphPoint {
  y: number | ExtraInfo | null;
  x: string;
}

export interface GraphExtraPoint extends GraphPoint {
  extra: ExtraInfo | number;
}
