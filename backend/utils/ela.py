from PIL import Image, ImageChops, ImageEnhance
import numpy as np
import os


def perform_ela(image_path, output_folder="ela_outputs", quality=90):

    os.makedirs(output_folder, exist_ok=True)

    filename = os.path.basename(image_path)

    temp_file = os.path.join(output_folder, "temp.jpg")
    ela_file = os.path.join(output_folder, "ela_" + filename)

    original = Image.open(image_path).convert("RGB")

    original.save(temp_file, "JPEG", quality=quality)

    compressed = Image.open(temp_file)

    diff = ImageChops.difference(original, compressed)

    extrema = diff.getextrema()

    max_diff = max([value[1] for value in extrema])

    if max_diff == 0:
        max_diff = 1

    scale = 255.0 / max_diff

    ela_image = ImageEnhance.Brightness(diff).enhance(scale)

    ela_image.save(ela_file)

    # -----------------------
    # Calculate ELA statistics
    # -----------------------

    ela_np = np.array(ela_image)

    ela_score = float(np.mean(ela_np))

    suspicious_pixels = np.sum(ela_np > 220)

    total_pixels = ela_np.size

    suspicious_percentage = (
        suspicious_pixels / total_pixels
    ) * 100

    return {
        "ela_image": ela_file,
        "ela_score": round(ela_score, 2),
        "suspicious_percentage": round(suspicious_percentage, 2)
    }