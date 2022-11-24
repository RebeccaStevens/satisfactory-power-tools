import { TransferType } from "~/data/docs/items";

// TODO: Get these numbers from the game data.

const maxBeltTransferRatePerSecond = 13; // 780 per minute
const maxPipeTransferRatePerSecond = 10_000; // 600000 per minute

/**
 * Get the maximum rate at which something can be transferred using the given transfer type.
 */
export function getMaxTransferRate(
  transferType: TransferType,
  perXSeconds = 60,
) {
  switch (transferType) {
    case TransferType.BELT: {
      return getMaxBeltTransferRate(perXSeconds);
    }

    case TransferType.PIPE: {
      return getMaxPipeTransferRate(perXSeconds);
    }

    case TransferType.NONE: {
      return 0;
    }
  }
}

/**
 * Get the maximum rate at which something can be transferred via a belt.
 */
export function getMaxBeltTransferRate(perXSeconds = 60) {
  return maxBeltTransferRatePerSecond * perXSeconds;
}

/**
 * Get the maximum rate at which something can be transferred via a pipe.
 */
export function getMaxPipeTransferRate(perXSeconds = 60) {
  return maxPipeTransferRatePerSecond * perXSeconds;
}
