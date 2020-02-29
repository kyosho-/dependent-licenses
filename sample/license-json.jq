to_entries | map({
    "package": .key,
    "license": .value.licenses,
    "repository": .value.repository
})