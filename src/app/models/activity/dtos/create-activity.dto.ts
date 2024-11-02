import {Activity} from "../activity.model";

export type CreateActivityDto = Omit<Activity, "id">;
