class PageConfig {
  readonly HOME = "/";
  readonly AUTH = "/auth";
  readonly REGISTER = this.AUTH + "/register";
  readonly LOGIN = this.AUTH + "/login";
}
export const PAGES = new PageConfig();
