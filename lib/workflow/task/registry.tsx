import { LaunchBrowser } from "@/lib/workflow/task/LaunchBrowser";
import { PageToHtml } from "./PageToHtml";
import { ExtractTextFromElement } from "./ExtractTextFromElement";
import { TaskType } from "@/types/task";
import { workFlowTask } from "@/types/workflow";

type Registry = {
  [K in TaskType]: workFlowTask & { type: K }; // Making sure that each type is correctly declared & used
};

export const TaskRegistry: Registry = {
  LAUNCH_BROWSER: LaunchBrowser,
  PAGE_TO_HTML: PageToHtml,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElement,
};
