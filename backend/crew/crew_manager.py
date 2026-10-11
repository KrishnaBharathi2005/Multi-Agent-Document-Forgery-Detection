from crewai import Crew
from crew.tasks import create_tasks
from crew.agents import (
    image_agent,
    ocr_agent,
    ela_agent,
    report_agent,
)


def create_crew():
    return Crew(
        agents=[
            image_agent,
            ocr_agent,
            ela_agent,
            report_agent,
        ],
        tasks=create_tasks(),
        verbose=True,
    )


def run_crew(inputs):

    crew = create_crew()

    result = crew.kickoff(inputs=inputs)

    return {
        "final_report": str(result)
    }