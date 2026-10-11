from utils.llm import generate_ai_report


class ReportAgent:

    def generate(self, image_result, ocr_result, ela_result):

        score = 100
        reasons = []

        blur = image_result["result"]["blur_score"]
        confidence = ocr_result["result"]["confidence"]
        ela_score = ela_result["result"]["ela_score"]

        # Image Quality
        if blur < 100:
            score -= 20
            reasons.append("Image is blurry.")
        else:
            reasons.append("Image is sharp.")

        # OCR Quality
        if confidence == 0:
            score -= 40
            reasons.append("No readable text detected.")
        elif confidence < 60:
            score -= 20
            reasons.append("Low OCR confidence.")
        else:
            reasons.append("Good OCR confidence.")

        # ELA Analysis
        if ela_score > 40:
            score -= 20
            reasons.append("ELA indicates possible tampering.")
        else:
            reasons.append("ELA does not indicate significant tampering.")

        # Final Decision
        if score >= 85:
            status = "Likely Genuine"
        elif score >= 60:
            status = "Needs Manual Review"
        else:
            status = "Suspicious"

        # Generate AI Summary (always)
        ai_summary = generate_ai_report(
            image_result,
            ocr_result,
            ela_result
        )

        return {
            "status": status,
            "trust_score": score,
            "reasons": reasons,
            "ai_summary": ai_summary
        }