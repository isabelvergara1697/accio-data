import html2canvas from "html2canvas";

export interface DownloadOptions {
  filename?: string;
  format?: "jpg" | "png";
  quality?: number;
  scale?: number;
}

export const downloadWidgetAsImage = async (
  widgetId: string,
  options: DownloadOptions = {},
): Promise<void> => {
  try {
    const {
      filename = `widget-${widgetId}-${Date.now()}`,
      format = "jpg",
      quality = 0.9,
      scale = 2,
    } = options;

    // Find the widget element by data attribute
    let widgetElement = document.querySelector(
      `[data-widget-container="true"][data-widget-id="${widgetId}"]`,
    ) as HTMLElement;

    if (!widgetElement) {
      // Fallback: try to find by any widget container that might match
      const allWidgets = document.querySelectorAll(
        '[data-widget-container="true"]',
      );

      for (const widget of allWidgets) {
        const widgetDataId = widget.getAttribute("data-widget-id");
        const widgetTitle = widget
          .querySelector("[data-widget-title]")
          ?.getAttribute("data-widget-title");

        // Check if this is the widget we're looking for
        if (
          widgetDataId === widgetId ||
          widget.id === widgetId ||
          (widgetTitle &&
            filename.includes(widgetTitle.toLowerCase().replace(/\s+/g, "-")))
        ) {
          widgetElement = widget as HTMLElement;
          break;
        }
      }

      if (!widgetElement) {
        console.error(
          `Widget with ID "${widgetId}" not found. Available widgets:`,
          Array.from(allWidgets).map((w) => ({
            id: w.getAttribute("data-widget-id"),
            title: w
              .querySelector("[data-widget-title]")
              ?.getAttribute("data-widget-title"),
          })),
        );
        throw new Error(`Widget not found: ${widgetId}`);
      }
    }

    return downloadElementAsImage(
      widgetElement,
      filename,
      format,
      quality,
      scale,
    );
  } catch (error) {
    console.error("Error downloading widget:", error);
    throw error;
  }
};

const downloadElementAsImage = async (
  element: HTMLElement,
  filename: string,
  format: "jpg" | "png",
  quality: number,
  scale: number,
): Promise<void> => {
  try {
    // Configure html2canvas options for better quality
    const canvas = await html2canvas(element, {
      scale: scale,
      useCORS: true,
      allowTaint: false,
      backgroundColor: "#FFFFFF",
      removeContainer: false,
      logging: false,
      width: element.offsetWidth,
      height: element.offsetHeight,
      scrollX: 0,
      scrollY: 0,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });

    // Convert canvas to blob
    const mimeType = format === "jpg" ? "image/jpeg" : "image/png";

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          throw new Error("Failed to create image blob");
        }

        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${filename}.${format}`;

        // Trigger download
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        console.log(`✅ Widget downloaded as ${filename}.${format}`);
      },
      mimeType,
      quality,
    );
  } catch (error) {
    console.error("Error capturing element:", error);
    throw error;
  }
};

// Helper function to download current visible widgets
export const downloadAllWidgets = async (): Promise<void> => {
  try {
    const widgets = document.querySelectorAll('[data-widget-container="true"]');

    for (let i = 0; i < widgets.length; i++) {
      const widget = widgets[i] as HTMLElement;
      const widgetTitle =
        widget.querySelector("[data-widget-title]")?.textContent ||
        `Widget-${i + 1}`;
      const filename = `dashboard-${widgetTitle.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;

      await downloadElementAsImage(widget, filename, "jpg", 0.9, 2);

      // Small delay between downloads to prevent overwhelming the browser
      if (i < widgets.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    console.log(`✅ Downloaded ${widgets.length} widgets`);
  } catch (error) {
    console.error("Error downloading widgets:", error);
    throw error;
  }
};
