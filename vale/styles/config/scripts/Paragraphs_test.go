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

func TestParagraphs(t *testing.T) {
	t.Run("don't use", func(t *testing.T) {
		src := `Don't use:

- <br>
- <br />
- <br/>
`
		data, err := os.ReadFile("Paragraphs.tengo")
		require.NoError(t, err)

		data = regexp.MustCompile(`DEBUG := false`).ReplaceAll(data, []byte(`DEBUG := true`))

		script := tengo.NewScript(data)
		script.SetImports(stdlib.GetModuleMap("text", "fmt", "math"))

		err = script.Add("scope", src)
		require.NoError(t, err)

		compiled, err := script.RunContext(context.Background())
		require.NoError(t, err)

		want := []map[string]int{
			{"begin": 14, "end": 18},
			{"begin": 21, "end": 27},
			{"begin": 30, "end": 35},
		}

		assert.Equal(t, want, mustParseMatches(compiled.Get("matches").Array()))
	})

	t.Run("with exclusions", func(t *testing.T) {
		src := `
Test exclusions:

<!-- vale Grafana.Paragraphs = NO -->

- <br>
- <br />
- <br/>

<!-- vale Grafana.Paragraphs = YES -->

Don't use:

- <br>
- <br />
- <br/>
`

		data, err := os.ReadFile("Paragraphs.tengo")
		require.NoError(t, err)

		data = regexp.MustCompile(`DEBUG := false`).ReplaceAll(data, []byte(`DEBUG := true`))

		script := tengo.NewScript(data)
		script.SetImports(stdlib.GetModuleMap("text", "fmt", "math"))

		err = script.Add("scope", src)
		require.NoError(t, err)

		compiled, err := script.RunContext(context.Background())
		require.NoError(t, err)

		want := []map[string]int{
			{"begin": 137, "end": 141},
			{"begin": 144, "end": 150},
			{"begin": 153, "end": 158},
		}

		assert.Equal(t, want, mustParseMatches(compiled.Get("matches").Array()))
	})
}
