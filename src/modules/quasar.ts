import { Quasar } from "quasar";

import { type UserModule } from "~/types";

export const install: UserModule = ({ app }) => {
  app.use(Quasar, {
    /* eslint-disable sonarjs/no-duplicate-string */
    iconSet: {
      name: "icons",
      type: {
        positive: "i-carbon-checkmark-outline",
        negative: "i-carbon-subtract-alt",
        info: "i-carbon-information",
        warning: "i-carbon-warning",
      },
      arrow: {
        up: "i-carbon-arrow-up",
        right: "i-carbon-arrow-right",
        down: "i-carbon-arrow-down",
        left: "i-carbon-arrow-left",
        dropdown: "i-ic-baseline-arrow-drop-down",
      },
      chevron: {
        left: "i-carbon-chevron-left",
        right: "i-carbon-chevron-right",
      },
      colorPicker: {
        spectrum: "i-carbon-gradient",
        tune: "i-carbon-settings-adjust",
        palette: "i-carbon-color-palette",
      },
      pullToRefresh: {
        icon: "i-carbon-restart",
      },
      carousel: {
        left: "i-carbon-chevron-left",
        right: "i-carbon-chevron-right",
        up: "i-carbon-chevron-up",
        down: "i-carbon-chevron-down",
        navigationIcon: "i-carbon-circle-solid",
      },
      chip: {
        remove: "i-carbon-close-outline",
        selected: "i-carbon-checkmark",
      },
      datetime: {
        arrowLeft: "i-carbon-chevron-left",
        arrowRight: "i-carbon-chevron-right",
        now: "i-carbon-time",
        today: "i-carbon-calendar",
      },
      editor: {
        bold: "i-carbon-text-bold",
        italic: "i-carbon-text-italic",
        strikethrough: "i-carbon-text-strikethrough",
        underline: "i-carbon-text-underline",
        unorderedList: "i-carbon-list-bulleted",
        orderedList: "i-carbon-list-numbered",
        subscript: "i-carbon-text-subscript",
        superscript: "i-carbon-text-superscript",
        hyperlink: "i-carbon-text-link",
        toggleFullscreen: "i-carbon-fit-to-screen",
        quote: "i-carbon-quotes",
        left: "i-carbon-text-align-left",
        center: "i-carbon-text-align-center",
        right: "i-carbon-text-align-right",
        justify: "i-carbon-text-align-justify",
        print: "i-carbon-printer",
        outdent: "i-carbon-text-indent-less",
        indent: "i-carbon-text-indent-more",
        removeFormat: "i-carbon-text-clear-format",
        formatting: "i-carbon-text-color",
        fontSize: "i-carbon-text-font",
        align: "i-carbon-text-align-left",
        hr: "i-carbon-subtract",
        undo: "i-carbon-undo",
        redo: "i-carbon-redo",
        heading: "i-carbon-text-font",
        heading1: "i-ci-heading-h1",
        heading2: "i-ci-heading-h2",
        heading3: "i-ci-heading-h3",
        heading4: "i-ci-heading-h4",
        heading5: "i-ci-heading-h5",
        heading6: "i-ci-heading-h6",
        code: "i-carbon-code",
        size: "i-carbon-text-font",
        size1: "i-carbon-number-1",
        size2: "i-carbon-number-2",
        size3: "i-carbon-number-3",
        size4: "i-carbon-number-4",
        size5: "i-carbon-number-5",
        size6: "i-carbon-number-6",
        size7: "i-carbon-number-7",
        font: "i-carbon-text-font",
        viewSource: "i-carbon-code",
      },
      expansionItem: {
        icon: "i-carbon-chevron-down",
        denseIcon: "i-carbon-caret-down",
      },
      fab: {
        icon: "i-carbon-add",
        activeIcon: "i-carbon-close",
      },
      field: {
        clear: "i-carbon-close-filled",
        error: "i-carbon-error-filled",
      },
      pagination: {
        first: "i-carbon-page-first",
        prev: "i-carbon-chevron-left",
        next: "i-carbon-chevron-right",
        last: "-carbon-page-last",
      },
      rating: {
        icon: "i-carbon-star-filled",
      },
      stepper: {
        done: "i-carbon-checkmark",
        active: "i-carbon-edit",
        error: "i-carbon-error",
      },
      tabs: {
        left: "i-carbon-chevron-left",
        right: "i-carbon-chevron-right",
        up: "i-carbon-chevron-up",
        down: "i-carbon-chevron-down",
      },
      table: {
        arrowUp: "i-carbon-arrow-up",
        warning: "i-carbon-warning-alt-filled",
        firstPage: "i-carbon-page-first",
        prevPage: "i-carbon-chevron-left",
        nextPage: "i-carbon-chevron-right",
        lastPage: "-carbon-page-last",
      },
      tree: {
        icon: "i-carbon-play-filled-alt",
      },
      uploader: {
        selected: "i-carbon-checkmark",
        activeIcon: "i-carbon-close",
        add: "i-carbon-add-filled",
        upload: "i-carbon-cloud-upload",
        removeQueue: "i-carbon-sort-remove",
        removeUploaded: "i-carbon-task-remove",
      },
    },
    /* eslint-enable sonarjs/no-duplicate-string */
  });
};
