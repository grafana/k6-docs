package test

import (
	"context"
	"os"
	"regexp"
	"strings"
	"testing"

	"github.com/d5/tengo/v2"
	"github.com/d5/tengo/v2/stdlib"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestSmartQuotes(t *testing.T) {
	t.Run("don't use", func(t *testing.T) {
		src := `Don't use:

- ‘ (left single quotation mark)
- ’ (right single quotation mark)
- ʼ (modifier letter apostrophe)
- “ (left double quotation mark)
- ” (right double quotation mark)
`
		data, err := os.ReadFile("SmartQuotes.tengo")
		require.NoError(t, err)

		data = regexp.MustCompile(`DEBUG := false`).ReplaceAll(data, []byte(`DEBUG := true`))

		script := tengo.NewScript(data)
		script.SetImports(stdlib.GetModuleMap("text", "fmt", "math"))

		err = script.Add("scope", src)
		require.NoError(t, err)

		compiled, err := script.RunContext(context.Background())
		require.NoError(t, err)

		want := []map[string]int{
			{
				"begin": strings.LastIndex(src, "‘"),
				"end":   strings.LastIndex(src, "‘") + len(`‘`),
			},
			{
				"begin": strings.LastIndex(src, "’"),
				"end":   strings.LastIndex(src, "’") + len(`’`),
			},
			{
				"begin": strings.LastIndex(src, "ʼ"),
				"end":   strings.LastIndex(src, "ʼ") + len(`ʼ`),
			},
			{
				"begin": strings.LastIndex(src, "“"),
				"end":   strings.LastIndex(src, "“") + len(`“`),
			},
			{
				"begin": strings.LastIndex(src, "”"),
				"end":   strings.LastIndex(src, "”") + len(`”`),
			},
		}

		assert.Equal(t, want, mustParseMatches(compiled.Get("matches").Array()))
	})

	t.Run("with exclusions", func(t *testing.T) {
		src := `
Test exclusions:

<!-- vale Grafana.SmartQuotes = NO -->

- ‘ (left single quotation mark)
- ’ (right single quotation mark)
- ʼ (modifier letter apostrophe)
- “ (left double quotation mark)
- ” (right double quotation mark)

<!-- vale Grafana.SmartQuotes = YES -->

Don't use:

- ‘ (left single quotation mark)
- ’ (right single quotation mark)
- ʼ (modifier letter apostrophe)
- “ (left double quotation mark)
- ” (right double quotation mark)
`

		data, err := os.ReadFile("SmartQuotes.tengo")
		require.NoError(t, err)

		data = regexp.MustCompile(`DEBUG := false`).ReplaceAll(data, []byte(`DEBUG := true`))

		script := tengo.NewScript(data)
		script.SetImports(stdlib.GetModuleMap("text", "fmt", "math"))

		err = script.Add("scope", src)
		require.NoError(t, err)

		compiled, err := script.RunContext(context.Background())
		require.NoError(t, err)

		want := []map[string]int{
			{
				"begin": strings.LastIndex(src, "‘"),
				"end":   strings.LastIndex(src, "‘") + len(`‘`),
			},
			{
				"begin": strings.LastIndex(src, "’"),
				"end":   strings.LastIndex(src, "’") + len(`’`),
			},
			{
				"begin": strings.LastIndex(src, "ʼ"),
				"end":   strings.LastIndex(src, "ʼ") + len(`ʼ`),
			},
			{
				"begin": strings.LastIndex(src, "“"),
				"end":   strings.LastIndex(src, "“") + len(`“`),
			},
			{
				"begin": strings.LastIndex(src, "”"),
				"end":   strings.LastIndex(src, "”") + len(`”`),
			},
		}

		assert.Equal(t, want, mustParseMatches(compiled.Get("matches").Array()))
	})
}
