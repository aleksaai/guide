import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { faq } from '../config/content'

export function FAQ() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container-prose">
        <div className="mb-10 sm:mb-12">
          <div className="eyebrow mb-4">{faq.eyebrow}</div>
          <h2 className="text-h1 font-semibold text-ink heading-tight">
            Kurz und <em className="accent-word">ehrlich</em>.
          </h2>
          <div className="accent-line mt-6" />
        </div>

        <Accordion.Root type="single" collapsible className="divide-y divide-line border-y border-line">
          {faq.items.map((item, i) => (
            <Accordion.Item key={i} value={`item-${i}`} className="group">
              <Accordion.Header>
                <Accordion.Trigger className="flex w-full items-center justify-between py-5 text-left text-ink font-medium text-[15px] sm:text-base hover:text-accent transition">
                  <span className="pr-4">{item.q}</span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted transition-transform group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden text-sm text-muted leading-relaxed data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="pb-5 pr-6 max-w-prose">{item.a}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  )
}
