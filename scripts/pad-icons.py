import os
from PIL import Image

def pad_icon(input_path, output_path, is_jpg=False):
    if not os.path.exists(input_path):
        print(f"Error: {input_path} not found.")
        return

    # Open the original image
    original = Image.open(input_path)
    orig_w, orig_h = original.size

    # We want the icon graphic to be around 70% of the canvas size to fit in the safe zone
    scale_factor = 0.70
    new_w = int(orig_w * scale_factor)
    new_h = int(orig_h * scale_factor)

    # Resize the original image using high-quality resampling
    resized = original.resize((new_w, new_h), Image.Resampling.LANCZOS)

    # Create new background canvas
    if is_jpg:
        # JPG needs a white background (since it doesn't support alpha)
        canvas = Image.new("RGB", (orig_w, orig_h), (255, 255, 255))
    else:
        # PNG has transparent background
        canvas = Image.new("RGBA", (orig_w, orig_h), (0, 0, 0, 0))

    # Center position
    offset_x = (orig_w - new_w) // 2
    offset_y = (orig_h - new_h) // 2

    # Paste resized image onto canvas
    if is_jpg:
        canvas.paste(resized, (offset_x, offset_y))
        canvas.save(output_path, "JPEG", quality=95)
    else:
        canvas.paste(resized, (offset_x, offset_y), resized if resized.mode == "RGBA" else None)
        canvas.save(output_path, "PNG")

    print(f"Padded icon saved to: {output_path}")

if __name__ == "__main__":
    # Pad the foreground adaptive icon
    pad_icon('./assets/images/brain-chip-circuit.png', './assets/images/brain-chip-circuit-padded.png', is_jpg=False)
    # Pad the main app icon
    pad_icon('./assets/images/brain-chip-circuit-white-bg.jpg', './assets/images/brain-chip-circuit-white-bg-padded.jpg', is_jpg=True)
    # Pad the white version of the logo we generated for the dark splash screen
    pad_icon('./assets/images/brain-chip-circuit-white.png', './assets/images/brain-chip-circuit-white-padded.png', is_jpg=False)
