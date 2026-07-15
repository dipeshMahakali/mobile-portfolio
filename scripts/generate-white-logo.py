import os
from PIL import Image

def generate_white_logo():
    input_path = './assets/images/brain-chip-circuit.png'
    output_path = './assets/images/brain-chip-circuit-white.png'

    if not os.path.exists(input_path):
        print(f"Error: Input file {input_path} does not exist.")
        return

    # Open image
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()

    # Create new image data with white pixels replacing any colored pixels while maintaining alpha
    new_data = []
    for item in data:
        # item is (r, g, b, a)
        r, g, b, a = item
        # If the pixel is not fully transparent, make it white
        if a > 0:
            new_data.append((255, 255, 255, a))
        else:
            new_data.append((r, g, b, a))

    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Successfully generated white logo at: {output_path}")

if __name__ == "__main__":
    generate_white_logo()
