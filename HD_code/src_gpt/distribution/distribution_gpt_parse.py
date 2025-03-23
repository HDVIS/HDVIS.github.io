import re
import pandas as pd

# File path to your txt file
input_caption = open('/home/zhutou/project/harvard/talk-about-embedding/distribution_yes_no_relationship.txt', 'r')

# Read the content of the txt file
lines = input_caption.readlines()
all_no_indices = []
yes_counts = [0, 0, 0]
columns = ["Distribution of dimension(s) on different items", "Distribution of items in a 2D space", "Spatial distribution of item clusters or dimensions", "Paper DOI", "Context"]
rows = range(1, 558)

df = pd.DataFrame(columns=columns, index=rows).fillna("")

for i, line in enumerate(lines):
    if line.startswith('Text'):
        row_index = int(line.strip().split()[1])
        df.at[row_index, "Paper DOI"] = lines[i+1].strip()
        df.at[row_index, "Context"] = lines[i+2].strip()
        count_no = 0
        for index in range(1,50):
            if "---" in lines[i +index]:
                break
            lower_question = lines[i + index].lower()
            if lower_question.startswith("yes"):
                question_index = lines[i + index -1].strip().split(".")[0]
                yes_counts[int(question_index) - 1] += 1
                column_name = df.columns[int(question_index) - 1]
                df.at[row_index, column_name] = "yes"
            if lower_question.startswith("no"):
                count_no += 1
                question_index = lines[i + index -1].strip().split(".")[0]
                column_name = df.columns[int(question_index) - 1]
                df.at[row_index, column_name] = "no"
        if count_no == 3:
            text_index = int(line.split()[1])
            all_no_indices.append(text_index)
            print(line.strip())
            print(lines[i + 1].strip())
            print(lines[i + 2].strip())
            print(lines[i + 3].strip())
            print()

print("First-Round Analyses:")
print("Length of the all no texts: {}".format(len(all_no_indices)))

print("Text indices where all answers are 'no':", all_no_indices)
print("Yes counts for each question:", yes_counts)
print("------------------")

csv_file_path = "/home/zhutou/project/harvard/talk-about-embedding/distribution_statistics.csv"
df.to_csv(csv_file_path, index=True)
#result is in trajectory_stats_first_round.txt