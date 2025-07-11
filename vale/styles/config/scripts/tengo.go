package test

func mustParseMatches(a []interface{}) []map[string]int {
	matches := []map[string]int{}

	for _, i := range a {
		m, _ := i.(map[string]any)
		match := map[string]int{
			"begin": int(m["begin"].(int64)),
			"end":   int(m["end"].(int64)),
		}

		matches = append(matches, match)
	}

	return matches
}
