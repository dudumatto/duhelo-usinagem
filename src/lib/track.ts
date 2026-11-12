import { trackEvent } from "./analytics";

export function track(event: string, props: Record<string, any> = {}) {
  const params: Record<string, any> = {};
  if (props.page) params.cta_page = props.page;
  if (props.position) params.cta_position = props.position;
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log("[track]", event, params);
  }
  trackEvent(event, params);
}
