import { LaunchBrowser } from "@/lib/workflow/task/LaunchBrowser";
import { PageToHtml } from "./PageToHtml";
import { ExtractTextFromElement } from "./ExtractTextFromElement";

export const TaskRegistry = {
    LAUNCH_BROWSER: LaunchBrowser,
    PAGE_TO_HTML: PageToHtml,
    EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElement,
};