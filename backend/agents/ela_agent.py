from utils.ela import perform_ela


class ELAAgent:

    def process(self, image_path):

        ela = perform_ela(image_path)

        score = ela["ela_score"]

        if score < 20:
            status = "Low Suspicion"

        elif score < 40:
            status = "Medium Suspicion"

        else:
            status = "High Suspicion"

        ela["status"] = status

        return {
            "agent": "ELA Agent",
            "result": ela
        }