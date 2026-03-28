import { Button, Card, Progress, Space, Typography } from 'antd'
import type { Answer, Clef, Level } from '../types'
import { TOTAL_QUESTIONS } from '../gameLogic'

const { Title, Text } = Typography

interface Props {
  answers: Answer[]
  level: Level
  clef: Clef
  onRestart: () => void
}

function getGrade(score: number): { label: string; color: string } {
  const pct = (score / TOTAL_QUESTIONS) * 100
  if (pct === 100) return { label: 'Perfect!', color: '#722ed1' }
  if (pct >= 85) return { label: 'Excellent', color: '#52c41a' }
  if (pct >= 70) return { label: 'Good', color: '#1677ff' }
  if (pct >= 50) return { label: 'Keep practicing', color: '#fa8c16' }
  return { label: 'Keep going!', color: '#ff4d4f' }
}

export default function ResultsScreen({ answers, level, clef, onRestart }: Props) {
  const score = answers.filter((a) => a.correct).length
  const percent = Math.round((score / TOTAL_QUESTIONS) * 100)
  const grade = getGrade(score)

  // Find most missed notes
  const missed = answers
    .filter((a) => !a.correct)
    .reduce<Record<string, number>>((acc, a) => {
      const n = a.question.note.name
      acc[n] = (acc[n] ?? 0) + 1
      return acc
    }, {})

  const missedSorted = Object.entries(missed).sort((a, b) => b[1] - a[1]).slice(0, 3)

  return (
    <div style={{
      height: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      background: 'linear-gradient(135deg, #e6f4ff 0%, #f0f5ff 100%)',
    }}>
      <Card style={{ width: '100%', maxWidth: 400, borderRadius: 16 }}>
        <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
          <div>
            <Title level={2} style={{ margin: 0, color: grade.color }}>{grade.label}</Title>
            <Text type="secondary" style={{ textTransform: 'capitalize' }}>
              {clef} clef — {level}
            </Text>
          </div>

          <div>
            <Progress
              type="circle"
              percent={percent}
              strokeColor={grade.color}
              format={() => `${score}/${TOTAL_QUESTIONS}`}
              size={120}
            />
          </div>

          {missedSorted.length > 0 && (
            <div style={{ textAlign: 'left' }}>
              <Text strong>Notes to review:</Text>
              <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {missedSorted.map(([name, count]) => (
                  <span
                    key={name}
                    style={{
                      background: '#fff2f0',
                      border: '1px solid #ffccc7',
                      borderRadius: 8,
                      padding: '4px 12px',
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#cf1322',
                    }}
                  >
                    {name} ×{count}
                  </span>
                ))}
              </div>
            </div>
          )}

          <Space style={{ width: '100%' }} direction="vertical">
            <Button
              type="primary"
              size="large"
              block
              style={{ height: 52, fontSize: 17, borderRadius: 12 }}
              onClick={onRestart}
            >
              Play Again
            </Button>
          </Space>
        </Space>
      </Card>
    </div>
  )
}
