package test

import (
	"context"
	"os"
	"regexp"
	"testing"

	"github.com/d5/tengo/v2"
	"github.com/d5/tengo/v2/stdlib"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestCommandLinePrompts(t *testing.T) {
	t.Run("don't use", func(t *testing.T) {
		src := `Don't use:
` + "```bash" + `
$ grafana-cli admin reset-admin-password
` + "```"
		data, err := os.ReadFile("CommandLinePrompts.tengo")
		require.NoError(t, err)

		data = regexp.MustCompile(`DEBUG := false`).ReplaceAll(data, []byte(`DEBUG := true`))

		script := tengo.NewScript(data)
		script.SetImports(stdlib.GetModuleMap("text", "fmt", "math"))

		err = script.Add("scope", src)
		require.NoError(t, err)

		compiled, err := script.RunContext(context.Background())
		require.NoError(t, err)

		want := []map[string]int{
			{"begin": 19, "end": 21},
		}

		assert.Equal(t, want, mustParseMatches(compiled.Get("matches").Array()))
	})

	t.Run("ignore other info types", func(t *testing.T) {
		src := "```markdown" + `
# A heading is fine
` + "```"
		data, err := os.ReadFile("CommandLinePrompts.tengo")
		require.NoError(t, err)

		data = regexp.MustCompile(`DEBUG := false`).ReplaceAll(data, []byte(`DEBUG := true`))

		script := tengo.NewScript(data)
		script.SetImports(stdlib.GetModuleMap("text", "fmt", "math"))

		err = script.Add("scope", src)
		require.NoError(t, err)

		compiled, err := script.RunContext(context.Background())
		require.NoError(t, err)

		want := []map[string]int{}

		assert.Equal(t, want, mustParseMatches(compiled.Get("matches").Array()))
	})

	t.Run("ignore outside of code blocks", func(t *testing.T) {
		src := "# A heading is fine"
		data, err := os.ReadFile("CommandLinePrompts.tengo")
		require.NoError(t, err)

		data = regexp.MustCompile(`DEBUG := false`).ReplaceAll(data, []byte(`DEBUG := true`))

		script := tengo.NewScript(data)
		script.SetImports(stdlib.GetModuleMap("text", "fmt", "math"))

		err = script.Add("scope", src)
		require.NoError(t, err)

		compiled, err := script.RunContext(context.Background())
		require.NoError(t, err)

		want := []map[string]int{}

		assert.Equal(t, want, mustParseMatches(compiled.Get("matches").Array()))
	})

	t.Run("with exclusions", func(t *testing.T) {
		src := `
Test exclusions:

<!-- vale Grafana.CommandLinePrompts = NO -->

` + "```bash" + `
$ grafana-cli admin reset-admin-password
` + "```" + `
<!-- vale Grafana.CommandLinePrompts = YES -->

Don't use:

` + "```bash" + `
$ grafana-cli admin reset-admin-password
` + "```"

		data, err := os.ReadFile("CommandLinePrompts.tengo")
		require.NoError(t, err)

		data = regexp.MustCompile(`DEBUG := false`).ReplaceAll(data, []byte(`DEBUG := true`))

		script := tengo.NewScript(data)
		script.SetImports(stdlib.GetModuleMap("text", "fmt", "math"))

		err = script.Add("scope", src)
		require.NoError(t, err)

		compiled, err := script.RunContext(context.Background())
		require.NoError(t, err)

		want := []map[string]int{
			{"begin": 187, "end": 189},
		}

		assert.Equal(t, want, mustParseMatches(compiled.Get("matches").Array()))
	})
}
