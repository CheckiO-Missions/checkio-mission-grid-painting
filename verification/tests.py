"""
TESTS is a dict with all of your tests.
Keys for this will be the categories' names.
Each test is a dict with
    "input" -- input data for a user function
    "answer" -- your right answer
    "explanation" -- not necessarily a key, it's used for an additional info in animation.
"""
TESTS = {
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
