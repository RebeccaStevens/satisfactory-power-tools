/**
 * Get the name of the given game entity.
 */
export function useGameDataName(entity: Readonly<{ id: string }>) {
  const { t } = useI18n();
  return t(`game-data.classes.${entity.id}.name`);
}
