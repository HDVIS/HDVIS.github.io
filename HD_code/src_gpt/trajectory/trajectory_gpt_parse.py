import re
import pandas as pd

# File path to your txt file
input_caption = open('/home/zhutou/project/harvard/talk-about-embedding/trajectory_yes_no_relationship.txt', 'r')

# Read the content of the txt file
lines = input_caption.readlines()
all_no_indices = []
yes_counts = [0, 0, 0, 0]
columns = ["Trajectory of Items", "Trajectory of Dimensions", "Dynamics of Trajectories", 
           "Interactions and Comparison Among Trajectories", "Paper DOI", "Context"]
rows = range(1, 389)  # 388 rows, numbering starts at 1

df = pd.DataFrame(columns=columns, index=rows).fillna("")

for i, line in enumerate(lines):
    if line.startswith('Text'):
        row_index = int(line.strip().split()[1])
        df.at[row_index, "Paper DOI"] = lines[i+1].strip()
        df.at[row_index, "Context"] = lines[i+2].strip()
        count_no = 0
        for index in range(1,20):
            if "---" in lines[i +index]:
                break
            lower_question = lines[i + index].lower()
            if lower_question.startswith("yes"):
                question_index = lines[i + index -1].strip().split(":", 1)[0].split()[-1]
                yes_counts[int(question_index) - 1] += 1
                column_name = df.columns[int(question_index) - 1]
                df.at[row_index, column_name] = "yes"
            if lower_question.startswith("no"):
                count_no += 1
                question_index = lines[i + index -1].strip().split(":", 1)[0].split()[-1]
                column_name = df.columns[int(question_index) - 1]
                df.at[row_index, column_name] = "no"
        if count_no == 4:
            text_index = int(line.split()[1])
            all_no_indices.append(text_index)
            print(line.strip())
            print(lines[i + 1].strip())
            print(lines[i + 2].strip())
            print()

# print("First-Round Analyses:")
# print("Length of the all no texts: {}".format(len(all_no_indices)))

# print("Text indices where all answers are 'no':", all_no_indices)
# print("Yes counts for each question:", yes_counts)
# print("------------------")

csv_file_path = "/home/zhutou/project/harvard/talk-about-embedding/trajectory_statistics.csv"
df.to_csv(csv_file_path, index=True)

#result is in trajectory_stats_first_round.txt