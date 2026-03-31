import { useEffect, useMemo } from "react";
import { Queries } from "../../Api";
import { useAppDispatch, useAppSelector } from "../../Store/Hooks";
import { setSettings } from "../../Store/Slices/SettingsSlice";

const toExternalUrl = (value?: string | null) => {
  const v = (value ?? "").trim();
  if (!v) return "";
  if (/^https?:\/\//i.test(v)) return v;
  return `https://${v}`;
};

export const useSettings = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings.item);
  const { data: settingsData } = Queries.useGetSettings();

  useEffect(() => {
    if (!settingsData) return;
    dispatch(setSettings((settingsData as any)?.data ?? settingsData ?? null));
  }, [dispatch, settingsData]);

  const socialList = useMemo(
    () =>
      [
        { key: "facebook", url: toExternalUrl(settings?.socialMediaLinks?.facebook) },
        { key: "instagram", url: toExternalUrl(settings?.socialMediaLinks?.instagram) },
        { key: "twitter", url: toExternalUrl(settings?.socialMediaLinks?.twitter) },
        { key: "linkedin", url: toExternalUrl(settings?.socialMediaLinks?.linkedin) },
      ].filter((item) => Boolean(item.url)),
    [settings]
  );

  const storeInfo = useMemo(
    () => ({
      address: (settings?.address ?? "").trim(),
      email: (settings?.email ?? "").trim(),
      phoneNumber: (settings?.phoneNumber ?? "").trim(),
      website: (settings?.link ?? "").trim(),
      websiteHref: toExternalUrl(settings?.link),
    }),
    [settings]
  );

  return { settings, settingsData, socialList, storeInfo };
};
