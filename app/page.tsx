import { PromoPlayer } from '@/components/promo/promo-player'

export default function Page() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#07080b] px-4 py-10 text-white md:px-8 md:py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-3">
          <p className="flex items-center gap-3 text-sm font-semibold text-[#8f96a3]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff7a00]" />
            <span dir="ltr">@iiZo7al</span>
          </p>
          <h1 className="text-balance text-4xl font-bold md:text-5xl">
            فيديو تعريفي لموقع <span dir="ltr">ZO<span className="text-[#ff7a00]">7</span>AL</span>
          </h1>
          <p className="text-pretty text-lg leading-relaxed text-[#8f96a3]">
            جولة سينمائية خلال ٣٥ ثانية في عالم زحل: شبكة ماينكرافت، المودباكات، مابات فورتنايت، التواصل والمتجر.
          </p>
        </header>
        <PromoPlayer />
      </div>
    </main>
  )
}
