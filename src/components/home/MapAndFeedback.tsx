import { ScrollReveal } from '../common/animation/ScrollReveal';
import { FeedbackForm } from './FeedbackForm';
import { LocationMap } from './LocationMap';

export const MapAndFeedback = () => {
  return (
    <ScrollReveal delay={0.3}>
      <section className="3xl:px-20 px-6 py-4 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-5 lg:items-start">
          <div className="col-span-5 lg:col-span-3">
            <LocationMap />
          </div>
          <div className="col-span-5 lg:col-span-2">
            <FeedbackForm />
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
};
