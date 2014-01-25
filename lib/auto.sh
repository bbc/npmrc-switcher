function npmrc_switch() {
        npmrc-switcher
}

if [[ -n "$ZSH_VERSION" ]]; then
        if [[ ! "$preexec_functions" == *npmrc_switch* ]]; then
                preexec_functions+=("npmrc_switch")
        fi
elif [[ -n "$BASH_VERSION" ]]; then
        trap '[[ "$BASH_COMMAND" != "$PROMPT_COMMAND" ]] && npmrc_switch' DEBUG
fi