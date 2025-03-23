# HD_code

## Workflow
- Caption + Reference
    - all_original_captions.txt
    - all_caption_reference.txt (after removing figures with captions failed extracted)
- Keyword Picking
    - caption_gram_1.py -> caption_gram_1.csv
    - caption_gram_2-4py -> caption_gram_2-4.csv
    - Manually picked 8 keywords
- Keyword Context 
    - keyword_context_clustering.py -> clustering_original_context.txt
    - keyword_context_correlation.py -> correlation_original_context.txt
    - keyword_context_distribution.py -> distribution_original_context.txt
    - keyword_context_trajectory.py -> trajectory_original_context.txt
- Context Summary
    - clustering_summary.py -> clustering_summary.txt
    - correlation_summary.py -> correlation_summary.txt
    - distribution_summary.py -> distribution_summary.txt
    - trajectory_summary.py -> trajectory_summary.txt
- GPT Annotation
    - clustering_yes_no_relationship.py -> clustering_yes_no_relationship.txt
    - correlation_yes_no_relationship.py -> correlation_yes_no_relationship.txt
    - distribution_yes_no_relationship.py -> distribution_yes_no_relationship.txt
    - trajectory_yes_no_relationship.py -> trajectory_yes_no_relationship.txt
- GPT Parsing
    - clustering_gpt_parse.py -> clustering_statistics.csv
    - correlation_gpt_parse.py -> correlation_statistics.csv
    - distribution_gpt_parse.py -> distribution_statistics.csv
    - trajectory_gpt_parse.py -> trajectory_statistics.csv