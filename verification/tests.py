"""
TESTS is a dict with all of your tests.
Keys for this will be the categories' names.
Each test is a dict with
    "input" -- input data for a user function
    "answer" -- your right answer
    "explanation" -- not necessarily a key, it's used for an additional info in animation.
"""
from itertools import combinations, combinations_with_replacement, chain
from string import ascii_uppercase as au
from random import sample, randint


def grid_painting(cells: str) -> tuple[int, list[list[str]]]:
    def area(c1, c2):
        (y1, x1), (y2, x2) = c1, c2
        return [(y, x) for y in range(min(y1, y2), max(y1, y2) + 1) for x in range(min(x1, x2), max(x1, x2) + 1)]

    def all_shapes(coords):
        for cs in combinations_with_replacement(coords, 2):
            shape = area(*cs)
            if set(shape) <= set(coords):
                yield shape

    coords = [divmod(au.index(a), 5) for a in cells]

    shapes = list(all_shapes(coords))
    last_shapes = set()
    for sp1 in shapes:
        for sp2 in shapes:
            if set(sp1) < set(sp2):
                break
        else:
            last_shapes.add(frozenset(sp1))

    for n in range(1, len(last_shapes)+1):
        for pieces in combinations(last_shapes, n):
            s = set(chain(*pieces))
            if set(coords) <= set(s):
                rectangles = []
                for p in pieces:
                    sp = sorted(p)
                    y1, x1 = min(sp)
                    y2, x2 = max(sp)
                    rectangles.append([au[y1 * 5 + x1], au[y2 * 5 + x2]])
                return n, rectangles


def make_raondom_tests(num: int) -> list[dict]:
    for _ in range(num):
        cells = ''.join(sorted(sample(au[:25], randint(4, 24))))
        answer, explanation = grid_painting(cells)
        yield {"input": [cells],
               "answer": answer,
               "explanation": explanation}


TESTS = {
    "Randoms": list(make_raondom_tests(5)),
    "Basics": [
        {
            "input": ["ABCFGHMRX"],
            "answer": 3,
            "explanation": [["A", "G"], ["C", "R"], ["X", "X"]],
        },
        {
            "input": ["GHLMNRS"],
            "answer": 2,
            "explanation": [["G", "M"], ["M", "S"]],
        },
        {
            "input": ["GHILNQRS"],
            "answer": 4,
            "explanation": [["G", "I"], ["L", "L"], ["N", "N"], ["Q", "S"]],
        },
    ],
    "Extra": [
        {
            "input": ["ABCDEFGHIJKLMNOPQRSTUVWXY"],
            "answer": 1,
            "explanation": [["A", "Y"]],
        },
        {
            "input": ["ACEGIKMOQSUWY"],
            "answer": 13,
            "explanation": [
                ["A", "A"], ["C", "C"], ["E", "E"], ["G", "G"], ["I", "I"],
                ["K", "K"], ["M", "M"], ["O", "O"], ["Q", "Q"], ["S", "S"],
                ["U", "U"], ["W", "W"], ["Y", "Y"],
            ],
        },
        {
            "input": ["ABDEFGHIJLMNPQRSTUVXY"],
            "answer": 5,
            "explanation": [["A", "G"], ["D", "J"], ["G", "S"], ["P", "V"], ["S", "Y"], ],
        },
        {
            "input": ["ABCDEFHJKLMNOPRTUVWXY"],
            "answer": 6,
            "explanation": [["A", "E"], ["K", "O"], ["U", "Y"], ["F", "P"], ["H", "R"], ["J", "T"]],
        },
        {
            "input": ["BCDFGHIJKLMNOPQRSTVWX"],
            "answer": 2,
            "explanation": [["B", "X"], ["F", "T"]],
        },
        {
            "input": ["BCDFGHIJKLNOPQRSTVWX"],
            "answer": 4,
            "explanation": [["B", "I"], ["F", "Q"], ["I", "T"], ["Q", "X"]],
        },
    ],
}
