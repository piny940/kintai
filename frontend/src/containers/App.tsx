import { TestID } from '@/resources/TestID'

export const App: React.FC = () => {
  return (
    <div id="app" data-testid={TestID.APP}>
      <h1>勤怠プラス+</h1>
    </div>
  )
}
