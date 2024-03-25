import { buildSelector } from "@/shared/lib/store";
import { JsonSettingsI } from "../../types/jsonSettings";

const defaultJsonSettings: JsonSettingsI = {};

export const [
    useJsonSettings, getJsonSettings
] = buildSelector(state => state.user?.authData?.jsonSettings ?? defaultJsonSettings);
