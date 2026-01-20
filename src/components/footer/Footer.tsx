import { CustomListItem } from '../ui/custom-components/CustomListItem';
import { BrandLogo } from '../common/BrandLogo';
import { BrandName } from '../common/BrandName';
import { ListItemKey } from '@/types/i18n/keys';

export async function Footer() {
  return (
    <footer className="bg-primary-900/80 text-footer-foreground/70 border-border/80 mt-8 w-full border-t py-6 lg:py-10 2xl:py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:items-start md:gap-0 md:text-left">
          <ul className="flex flex-col items-center gap-3 md:items-start">
            <BrandLogo>
              <BrandName variant="footer" />
            </BrandLogo>
            <CustomListItem i18nKey={ListItemKey.TAGLINE} variant="small" />
            <CustomListItem i18nKey={ListItemKey.RIGHTS} variant="small" />
            <CustomListItem i18nKey={ListItemKey.DESIGNED} variant="small" />
          </ul>

          <ul className="font-body flex flex-col items-center justify-center gap-3 sm:items-start">
            <CustomListItem i18nKey={ListItemKey.CONTACT} variant="title" />
            <CustomListItem i18nKey={ListItemKey.EMAIL} variant="small" />
            <CustomListItem i18nKey={ListItemKey.PHONE} variant="small" />
            <CustomListItem
              wrap
              i18nKey={ListItemKey.ADDRESS}
              variant="small"
            />
          </ul>

          <ul className="font-body flex flex-col items-center gap-3">
            <CustomListItem i18nKey={ListItemKey.FOLLOW_US} variant="title" />
            <div className="flex items-center gap-4">
              <CustomListItem
                i18nKey={ListItemKey.MAIL_TO}
                variant="link"
                href="mailto:onuryemez.is@gmail.com"
              />
              <CustomListItem
                i18nKey={ListItemKey.LINKED_IN}
                variant="link"
                href="https://www.linkedin.com/in/onur-yemez"
              />
            </div>
          </ul>
        </div>
      </div>
    </footer>
  );
}
