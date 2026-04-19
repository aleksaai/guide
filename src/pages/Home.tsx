import { Helmet } from 'react-helmet-async'
import { Hero } from '../components/Hero'
import { Integrations } from '../components/Integrations'
import { StatsStrip } from '../components/StatsStrip'
import { FormSection } from '../components/FormSection'
import { MyTeam } from '../components/MyTeam'
import { ChatPreview } from '../components/ChatPreview'
import { WhatsInside } from '../components/WhatsInside'
import { SocialProof } from '../components/SocialProof'
import { FAQ } from '../components/FAQ'
import { BottomCTA } from '../components/BottomCTA'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>KI-Team-Guide — Bau dir dein eigenes KI-Team | KI-Schule</title>
        <meta
          name="description"
          content="Der freie Guide der KI-Schule: So baust du mit Markdown-Dateien und Claude Code dein eigenes virtuelles Team aus KI-Mitarbeitern."
        />
        <link rel="canonical" href="https://guide.ki-hochschule.de/" />
      </Helmet>
      <Hero />
      <Integrations />
      <StatsStrip />
      <FormSection />
      <MyTeam />
      <ChatPreview />
      <WhatsInside />
      <SocialProof />
      <FAQ />
      <BottomCTA />
    </>
  )
}
