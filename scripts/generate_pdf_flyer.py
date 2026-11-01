import os
from reportlab.lib.pagesizes import landscape, letter
from reportlab.pdfgen import canvas
from PIL import Image

PROJECT_DIR = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
IMAGE_PATH = os.path.join(PROJECT_DIR, "public", "images", "vettalk-hero-banner.jpg")
PDF_OUTPUT = os.path.join(PROJECT_DIR, "public", "marketing", "VetTalk_Consult_Now_Flyer.pdf")
ARTIFACT_PDF = r"C:\Users\91837\.gemini\antigravity\brain\03da9407-aa90-461a-b265-8539e7ddf696\VetTalk_Consult_Now_Flyer.pdf"

# Read image aspect ratio
img = Image.open(IMAGE_PATH)
img_w, img_h = img.size

# We will create a PDF page that fits the exact banner dimensions (e.g. 1024 x 535 pt)
page_w = 1024
page_h = 535

c = canvas.Canvas(PDF_OUTPUT, pagesize=(page_w, page_h))

# Draw the image covering the full page
c.drawImage(IMAGE_PATH, 0, 0, width=page_w, height=page_h)

# Add URL Link Annotation over the entire banner
target_url = "https://vettalk-vg5a.vercel.app/?utm_source=whatsapp_pdf&utm_medium=document&utm_campaign=consult_now"
c.linkURL(target_url, (0, 0, page_w, page_h), relative=0)

# Red button coordinates in PDF coordinates (origin is bottom-left in PDF)
# Image coords from top: top = 67% of 535 = 358px, height = 18% of 535 = 96px
# In PDF coords (from bottom):
# y_bottom = 535 - (358 + 96) = 81
# y_top = 535 - 358 = 177
# x_left = 49.5% of 1024 = 507
# x_right = (49.5% + 48%) of 1024 = 998
btn_x1 = 507
btn_y1 = 81
btn_x2 = 998
btn_y2 = 177

# Add a dedicated link hotspot for the red button
c.linkURL(target_url, (btn_x1, btn_y1, btn_x2, btn_y2), relative=0)

c.save()

# Copy to artifacts directory
import shutil
shutil.copyfile(PDF_OUTPUT, ARTIFACT_PDF)

print(f"Generated clickable PDF flyer: {PDF_OUTPUT}")
