import os
import shutil
from PIL import Image, ImageDraw, ImageFont, ImageFilter

WIDTH = 1080
HEIGHT = 1920

# Directories
PROJECT_DIR = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
OUTPUT_DIR = os.path.join(PROJECT_DIR, "public", "marketing", "reel-banners")
ARTIFACTS_DIR = r"C:\Users\91837\.gemini\antigravity\brain\03da9407-aa90-461a-b265-8539e7ddf696"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Load fonts
FONT_DIR = "C:/Windows/Fonts"
font_title = ImageFont.truetype(os.path.join(FONT_DIR, "segoeuib.ttf"), 62)
font_subtitle = ImageFont.truetype(os.path.join(FONT_DIR, "segoeui.ttf"), 34)
font_card_head = ImageFont.truetype(os.path.join(FONT_DIR, "segoeuib.ttf"), 44)
font_card_sub = ImageFont.truetype(os.path.join(FONT_DIR, "segoeuib.ttf"), 32)
font_bullet = ImageFont.truetype(os.path.join(FONT_DIR, "segoeui.ttf"), 30)
font_bullet_bold = ImageFont.truetype(os.path.join(FONT_DIR, "segoeuib.ttf"), 30)
font_btn_big = ImageFont.truetype(os.path.join(FONT_DIR, "segoeuib.ttf"), 42)
font_btn_sub = ImageFont.truetype(os.path.join(FONT_DIR, "segoeui.ttf"), 26)
font_badge = ImageFont.truetype(os.path.join(FONT_DIR, "segoeuib.ttf"), 28)
font_micro = ImageFont.truetype(os.path.join(FONT_DIR, "segoeuib.ttf"), 22)

# Load logo and doctor images
logo_path = os.path.join(PROJECT_DIR, "public", "images", "vettalk-logo.jpg")
dr_path = os.path.join(PROJECT_DIR, "public", "images", "dr-soni.jpg")

logo_img = Image.open(logo_path).convert("RGBA")
dr_img = Image.open(dr_path).convert("RGBA")

def create_circular_image(image, size):
    img_sq = image.resize((size, size), Image.Resampling.LANCZOS)
    mask = Image.new('L', (size, size), 0)
    draw_mask = ImageDraw.Draw(mask)
    draw_mask.ellipse((0, 0, size, size), fill=255)
    
    output = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    output.paste(img_sq, (0, 0), mask)
    return output

def draw_rounded_card(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)

USE_CASES = [
    {
        "id": "1_dog_bite_emergency",
        "theme_color": (225, 29, 72),      # Rose red
        "theme_light": (255, 241, 242),     # Rose 50
        "theme_border": (254, 205, 211),   # Rose 200
        "badge_text": "🚨 URGENT EMERGENCY TRIAGE",
        "headline_line1": "Had a Dog Bite or",
        "headline_line2": "Cat Scratch?",
        "subheadline": "Bleeding, swelling, or worried about Rabies?",
        "bullet_title": "WHAT TO DO IN THE FIRST 10 MINUTES:",
        "bullets": [
            "Wash wound thoroughly under tap water with soap for 5 mins.",
            "Do NOT apply haldi, chillies, or tight tourniquets.",
            "Connect with Dr. R. Soni immediately for anti-rabies guidance."
        ],
        "doctor_note": "Immediate Wound Assessment & Prescription",
        "utm_campaign": "dog_bite_emergency",
        "insta_hook": "Had a dog bite or scratch? Don't panic! Tap below to talk to a verified doctor right now."
    },
    {
        "id": "2_pet_not_eating",
        "theme_color": (217, 119, 6),       # Amber 600
        "theme_light": (254, 243, 199),     # Amber 50
        "theme_border": (253, 230, 138),    # Amber 200
        "badge_text": "⚠️ APPETITE LOSS WARNING",
        "headline_line1": "Dog Refusing Food for",
        "headline_line2": "24+ Hours?",
        "subheadline": "Lethargic, drinking water only, or stomach rumbling?",
        "bullet_title": "WHEN LOSS OF APPETITE BECOMES CRITICAL:",
        "bullets": [
            "Skipping 2 meals can cause dangerous dehydration & liver stress.",
            "Sudden refusal usually indicates viral fever, acidity, or tick illness.",
            "Consult Dr. Soni from home before pet gets too weak to walk."
        ],
        "doctor_note": "Appetite Restoration & Medicine Advice",
        "utm_campaign": "pet_not_eating",
        "insta_hook": "Is your dog refusing food today? Don't wait until weakness sets in. Talk to Dr. R. Soni now."
    },
    {
        "id": "3_vomiting_diarrhea",
        "theme_color": (13, 148, 136),      # Teal 600
        "theme_light": (240, 253, 250),     # Teal 50
        "theme_border": (153, 246, 228),    # Teal 200
        "badge_text": "⚡ FAST STOMACH RELIEF",
        "headline_line1": "Frequent Vomiting or",
        "headline_line2": "Loose Motions?",
        "subheadline": "Yellow foam, watery diarrhea, or tummy pain?",
        "bullet_title": "FIRST AID BEFORE IT GETS SERIOUS:",
        "bullets": [
            "Stop solid heavy food immediately (withhold food 4–6 hrs).",
            "Offer small sips of ORS or electrolyte water every 30 mins.",
            "Get instant anti-emetic prescription & hydration triage."
        ],
        "doctor_note": "Instant Gastric Triage & Anti-Vomiting Rx",
        "utm_campaign": "vomiting_diarrhea",
        "insta_hook": "Pet vomiting yellow foam or having loose motions? Stop solid food and consult online immediately."
    },
    {
        "id": "4_itching_skin_allergy",
        "theme_color": (79, 70, 229),       # Indigo 600
        "theme_light": (238, 242, 255),     # Indigo 50
        "theme_border": (199, 210, 254),    # Indigo 200
        "badge_text": "📸 PHOTO DIAGNOSIS AVAILABLE",
        "headline_line1": "Non-Stop Scratching,",
        "headline_line2": "Red Rashes or Ticks?",
        "subheadline": "Ear shaking, paw licking, or hair fall patches?",
        "bullet_title": "WHY ITCHING SPREADS SO FAST:",
        "bullets": [
            "Flea bites & fungal infections multiply rapidly without correct meds.",
            "Continuous biting causes painful hot spots and bacterial secondary wounds.",
            "Upload pet photo on VetTalk — Dr. Soni reviews rash in 5 mins."
        ],
        "doctor_note": "Upload Photo for Accurate Skin Prescription",
        "utm_campaign": "skin_itching_allergy",
        "insta_hook": "Non-stop scratching or red skin patches on your pet? Upload a photo & consult Dr. Soni for Flat ₹200."
    },
    {
        "id": "5_toxic_food_poisoning",
        "theme_color": (220, 38, 38),       # Red 600
        "theme_light": (254, 242, 242),     # Red 50
        "theme_border": (254, 202, 202),    # Red 200
        "badge_text": "🚨 TOXIC ACCIDENT EMERGENCY",
        "headline_line1": "Ate Chocolate, Bones,",
        "headline_line2": "Onion or Poison?",
        "subheadline": "Accidentally swallowed human medicine or rat cake?",
        "bullet_title": "THE FIRST 30 MINUTES ARE LIFE-SAVING:",
        "bullets": [
            "Do NOT induce salt-water vomiting without doctor confirmation.",
            "Keep the packet or leftover piece ready to show the vet.",
            "Doctor will advise whether to induce emesis or rush for anti-toxin."
        ],
        "doctor_note": "Immediate Toxicity Evaluation & Antidote Guidance",
        "utm_campaign": "toxic_food_poisoning",
        "insta_hook": "Did your pet eat chocolate, grapes, bones, or poison? Act fast — connect with our doctor in 5 minutes."
    },
    {
        "id": "6_late_night_clinic_closed",
        "theme_color": (15, 23, 42),        # Slate 900
        "theme_light": (241, 245, 249),     # Slate 100
        "theme_border": (203, 213, 225),    # Slate 300
        "badge_text": "🌙 24*7 MIDNIGHT TELEHEALTH",
        "headline_line1": "Pet Sick at 2 AM &",
        "headline_line2": "Nearby Clinic Closed?",
        "subheadline": "Crying in pain, heavy panting, shivering, or anxious?",
        "bullet_title": "DON'T WAIT PANICKING TILL MORNING:",
        "bullets": [
            "Verified senior Indian veterinarian on call 24 hours a day.",
            "Connect from the comfort of your home in under 10 minutes.",
            "Get verified triage, pain relief advice, and emergency next steps."
        ],
        "doctor_note": "Verified 24*7 Online Emergency Video & WhatsApp Call",
        "utm_campaign": "late_night_emergency",
        "insta_hook": "It's 2 AM and your pet is sick? Don't wait until clinics open tomorrow. Talk to a vet right now."
    }
]

def render_banner(case):
    bg = Image.new("RGB", (WIDTH, HEIGHT), (248, 250, 252))
    draw = ImageDraw.Draw(bg)
    
    # Top decorative header bar (Teal brand color)
    draw.rectangle([(0, 0), (WIDTH, 18)], fill=(13, 148, 136))
    
    # Subtle top brand header area
    draw_rounded_card(draw, [(36, 40), (WIDTH - 36, 210)], radius=24, fill=(255, 255, 255), outline=(226, 232, 240), width=2)
    
    # Paste VetTalk circular logo in top card
    circ_logo = create_circular_image(logo_img, 140)
    bg.paste(circ_logo, (60, 55), circ_logo)
    
    # Brand Text next to Logo
    draw.text((220, 64), "VetTalk (24×7)", fill=(15, 23, 42), font=ImageFont.truetype(os.path.join(FONT_DIR, "segoeuib.ttf"), 44))
    draw.text((220, 118), "Verified Online Veterinary Telehealth", fill=(13, 148, 136), font=ImageFont.truetype(os.path.join(FONT_DIR, "segoeuib.ttf"), 26))
    draw.text((220, 155), "Licensed Indian Vets  •  WhatsApp Consultation  •  Quick & Easy", fill=(100, 116, 139), font=font_micro)

    # 2. Urgent Badge Pill for this Use Case
    badge_color = case["theme_color"]
    badge_bg = case["theme_light"]
    badge_border = case["theme_border"]
    
    badge_y = 236
    draw_rounded_card(draw, [(60, badge_y), (WIDTH - 60, badge_y + 54)], radius=27, fill=badge_bg, outline=badge_border, width=2)
    draw.text((85, badge_y + 11), case["badge_text"], fill=badge_color, font=font_badge)
    draw.text((WIDTH - 325, badge_y + 11), "⚡ Response in 5-10 Mins", fill=(71, 85, 105), font=font_badge)

    # 3. Main Hook Card (Large Attention-Grabbing Container)
    hook_y = 315
    draw_rounded_card(draw, [(40, hook_y), (WIDTH - 40, hook_y + 640)], radius=32, fill=(255, 255, 255), outline=case["theme_border"], width=3)
    
    # Catchy Headline in Bold High Contrast
    draw.text((70, hook_y + 35), case["headline_line1"], fill=(15, 23, 42), font=font_title)
    draw.text((70, hook_y + 110), case["headline_line2"], fill=badge_color, font=font_title)
    
    # Subheadline / Symptom question
    draw.text((70, hook_y + 200), case["subheadline"], fill=(71, 85, 105), font=font_subtitle)
    
    # Divider line
    draw.line([(70, hook_y + 265), (WIDTH - 70, hook_y + 265)], fill=(226, 232, 240), width=2)
    
    # Bullet points box
    draw.text((70, hook_y + 290), case["bullet_title"], fill=(15, 23, 42), font=font_card_sub)
    
    b_y = hook_y + 350
    for bullet in case["bullets"]:
        draw.ellipse([(70, b_y + 8), (86, b_y + 24)], fill=badge_color)
        draw.text((105, b_y), bullet, fill=(51, 65, 85), font=font_bullet)
        b_y += 65

    # 4. Doctor Verification & Trust Badge Card
    doc_y = 985
    draw_rounded_card(draw, [(40, doc_y), (WIDTH - 40, doc_y + 210)], radius=28, fill=(240, 253, 250), outline=(153, 246, 228), width=2)
    
    # Doctor photo circle
    circ_dr = create_circular_image(dr_img, 150)
    bg.paste(circ_dr, (65, doc_y + 30), circ_dr)
    
    # Doctor credentials
    draw.text((235, doc_y + 35), "Dr. R. Soni", fill=(15, 23, 42), font=ImageFont.truetype(os.path.join(FONT_DIR, "segoeuib.ttf"), 38))
    draw.text((235, doc_y + 80), "Senior Veterinary Telehealth Consultant", fill=(13, 148, 136), font=font_bullet_bold)
    draw.text((235, doc_y + 120), "Govt Reg: TSVC/02330/2024  •  100% Verified Telehealth", fill=(71, 85, 105), font=font_micro)
    draw.text((235, doc_y + 152), f"👉 {case['doctor_note']}", fill=badge_color, font=font_bullet_bold)

    # 5. Price & Value Highlight
    fee_y = 1225
    draw_rounded_card(draw, [(40, fee_y), (WIDTH - 40, fee_y + 140)], radius=24, fill=(255, 255, 255), outline=(203, 213, 225), width=2)
    
    # Left price pill
    draw_rounded_card(draw, [(60, fee_y + 20), (440, fee_y + 120)], radius=18, fill=(16, 185, 129), outline=(5, 150, 105), width=2)
    draw.text((85, fee_y + 35), "Flat ₹200 Only", fill=(255, 255, 255), font=font_card_head)
    draw.text((85, fee_y + 85), "No Clinic Waiting • Pay via UPI", fill=(240, 253, 250), font=font_micro)
    
    # Right guarantee
    draw.text((470, fee_y + 40), "🔒 100% Private & Safe", fill=(15, 23, 42), font=font_card_sub)
    draw.text((470, fee_y + 82), "Doctor connects on your WhatsApp within 5 mins", fill=(100, 116, 139), font=font_micro)

    # 6. INSTAGRAM REEL / STORY LINK STICKER CALL-TO-ACTION HOTSPOT
    cta_y = 1395
    draw_rounded_card(draw, [(40, cta_y), (WIDTH - 40, cta_y + 340)], radius=32, fill=(15, 118, 110), outline=(20, 184, 166), width=4)
    
    # Prompt text
    draw.text((85, cta_y + 30), "📲 TAP LINK STICKER TO CONSULT NOW:", fill=(204, 251, 241), font=font_card_sub)
    
    # Big White Button
    draw_rounded_card(draw, [(75, cta_y + 85), (WIDTH - 75, cta_y + 225)], radius=24, fill=(255, 255, 255), outline=(255, 255, 255))
    
    btn_text = "🔗 vettalk-vg5a.vercel.app"
    draw.text((115, cta_y + 110), btn_text, fill=(15, 118, 110), font=font_btn_big)
    draw.text((115, cta_y + 168), "Tap this link sticker to open WhatsApp intake form", fill=(71, 85, 105), font=font_btn_sub)
    
    # Arrow indicator
    draw.text((WIDTH - 180, cta_y + 120), "👉", fill=(15, 118, 110), font=font_btn_big)
    
    # Helper note below button
    draw.text((85, cta_y + 250), "Or visit link in bio: @vettalk24x7  •  Available 24 Hours / 7 Days", fill=(204, 251, 241), font=font_bullet)
    draw.text((85, cta_y + 290), "⚡ Select your preferred slot: Right Now (5-10 mins) or Later", fill=(254, 240, 138), font=font_bullet_bold)

    # 7. Bottom Footnote Bar
    draw.rectangle([(0, HEIGHT - 130), (WIDTH, HEIGHT)], fill=(15, 23, 42))
    draw.text((60, HEIGHT - 95), "🐾 VetTalk (24*7) — Happier Pets, Healthier Lives", fill=(255, 255, 255), font=font_bullet_bold)
    draw.text((60, HEIGHT - 55), "Emergency Veterinary Teleconsultation Across India  •  All Breeds Supported", fill=(148, 163, 184), font=font_micro)

    out_png = os.path.join(OUTPUT_DIR, f"{case['id']}.png")
    bg.save(out_png, "PNG", quality=95)
    
    artifact_png = os.path.join(ARTIFACTS_DIR, f"{case['id']}.png")
    shutil.copyfile(out_png, artifact_png)
    print(f"Generated: {out_png}")
    return out_png

for c in USE_CASES:
    render_banner(c)

print("All 6 banners rendered successfully!")
