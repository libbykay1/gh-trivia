from django.http import JsonResponse
from .common.json import ModelEncoder
from .models import (
    Question,
    Submission,
    Round,
    Team
)
from django.views.decorators.http import require_http_methods
import json
from django.forms.models import model_to_dict


class TeamEncoder(ModelEncoder):
    model = Team
    properties = [
        "id",
        "team_name",
        "total_points",
        "round_one_points",
        "round_two_points",
        "round_three_points",
        "round_four_points"
    ]


class RoundEncoder(ModelEncoder):
    model = Round
    properties = [
        "id",
        "number",
        "title",
        "prompt",
        "visible",
        "answers"
    ]


class QuestionListEncoder(ModelEncoder):
    model = Question
    properties = [
        "round",
        "number",
        "text",
        "image",
        "answer"
    ]
    encoders = {
        "round": RoundEncoder(),
    }


class SubmissionEncoder(ModelEncoder):
    model = Submission
    properties = [
        "id",
        "team",
        "double_or_nothing",
        "answer1",
        "answer2",
        "answer3",
        "answer4",
        "answer5",
        "answer6",
        "answer7",
        "answer8",
        "answer9",
        "answer10",
        "round",
        "team_object"
    ]


@require_http_methods(["GET"])
def get_questions(request, round):
    questions = Question.objects.filter(round=round)
    return JsonResponse(
        {"questions": questions},
        encoder=QuestionListEncoder,
    )


@require_http_methods(["GET", "POST"])
def get_teams(request):
    if request.method == "GET":
        teams = Team.objects.all()
        return JsonResponse(
            {"teams": teams},
            encoder=TeamEncoder,
        )
    else:
        content = json.loads(request.body)
        team = Team.objects.create(**content)
        return JsonResponse(
            team,
            encoder=TeamEncoder,
            safe=False
        )


@require_http_methods(["GET"])
def get_round(request, number):
    round = Round.objects.filter(number=number)[0]
    return JsonResponse(
        {"round": round},
        encoder=RoundEncoder,
    )


@require_http_methods(["POST", "GET"])
def new_submission(request):
    if request.method == "GET":
        submissions = Submission.objects.all()
        return JsonResponse(
            {"submissions": submissions},
            encoder=SubmissionEncoder,
        )
    else:
        content = json.loads(request.body)
        submission = Submission.objects.create(**content)
        return JsonResponse(
            submission,
            encoder=SubmissionEncoder,
            safe=False
        )


@require_http_methods(["GET"])
def get_round_submissions(request, round):
    submissions = Submission.objects.filter(round=round)
    return JsonResponse(
        {"submissions": submissions},
        encoder=SubmissionEncoder
    )


@require_http_methods(["PUT"])
def update_scores(request, id):
    content = json.loads(request.body)
    Team.objects.filter(id=id).update(**content)
    team = Team.objects.get(id=id)
    team.save()
    return JsonResponse(
        model_to_dict(team), safe=False
    )


@require_http_methods(["PUT"])
def make_visible(request, round):
    round = Round.objects.filter(number=round)[0]
    round.visible = True
    round.save()
    return JsonResponse({"round": round}, encoder=RoundEncoder)
