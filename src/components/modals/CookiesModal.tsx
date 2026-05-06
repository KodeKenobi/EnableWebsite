import { useEffect, useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HoverSlideText from "../ui/text/HoverSlideText.tsx";

export interface Cookie {
  name: string;
  value: string;
  type: "essential" | "analytics" | "marketing" | "functional";
}

const cookiesArray: Cookie[] = [
  {
    name: "allow_analytics_cookies",
    type: "functional",
    value: "false",
  },
  {
    name: "allow_functional_cookies",
    type: "functional",
    value: "false",
  },
  {
    name: "allow_marketing_cookies",
    type: "functional",
    value: "false",
  },
  {
    name: "agree_cookies_disclaimer",
    type: "functional",
    value: "true",
  },
];

const COOKIE_MAX_AGE_DAYS = 30;

function setCookie(name: string, value: string): void {
  try {
    const expires = new Date(
      Date.now() + COOKIE_MAX_AGE_DAYS * 24 * 60 * 60 * 1000,
    ).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
  } catch {
    /* no-op */
  }
}

function getCookie(name: string): string | null {
  try {
    const key = `${name}=`;
    const match = document.cookie
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith(key));
    return match ? match.slice(key.length) : null;
  } catch {
    return null;
  }
}

export default function CookiesModal() {
  const [open, setOpen] = useState<boolean>(false);
  const [customize, setCustomize] = useState<boolean>(false);
  const [cookies, setCookies] = useState<Cookie[]>(cookiesArray);

  const activeCookies = cookiesArray.some(
    (cookie) => getCookie(cookie.name) !== null,
  );

  const handleAcceptAll = () => {
    cookies.forEach((cookie) => {
      setCookie(cookie.name, "true");
    });

    setOpen(false);
  };

  const handleRejectAll = () => {
    cookies.forEach((cookie) => {
      setCookie(cookie.name, "false");
    });

    setOpen(false);
  };

  const handleCustomize = () => {
    setCustomize(!customize);
  };

  const handleSubmitCustomCookieConfig = () => {
    cookies.forEach((cookie) => {
      setCookie(cookie.name, cookie.value);
    });
    setOpen(false);
  };

  const handleCheckCookie = (key: string, value: string) => {
    const updatedCookies = cookies.map((cookie) => {
      if (cookie.name === key) {
        return { ...cookie, value: value };
      }
      return cookie;
    });

    setCookies(updatedCookies);
  };

  useLayoutEffect(() => {
    if (activeCookies) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [activeCookies]);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="cursor-pointer p-2 pr-8 bg-navy border border-white/35 shadow-sm shadow-black/20 fixed bottom-6 right-0 z-50 rounded-l-full translate-x-4 hover:translate-x-0 transition-transform duration-300"
        aria-label="Open cookies preferences"
      >
        <span className="inline-flex h-6 w-6 items-center justify-center text-lg">
          🍪
        </span>
      </button>
      <motion.div
        initial={{ opacity: 0 }}
        animate={open ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={`fixed inset-0 z-[99990] bg-[color-mix(in_srgb,var(--color-fg-strong)_62%,transparent)] backdrop-blur-md transition-opacity ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <motion.div
        initial={{
          y: "100%",
        }}
        animate={open ? { y: 0 } : { y: "100%" }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="shadow-2xl rounded-t-[36px] md:rounded-t-[46px] w-full overflow-y-auto max-w-[700px] shadow-black/30 z-[99999] fixed bottom-0 left-1/2 -translate-x-1/2 bg-navy font-light text-white py-9 px-8 md:px-32 text-center"
        style={{
          maxHeight: "calc(100% - 116px)",
        }}
      >
        <AnimatePresence mode="wait">
          {customize ? (
            <motion.div
              animate={{
                gridTemplateRows: "1fr",
              }}
              exit={{
                gridTemplateRows: "0fr",
              }}
              transition={{
                duration: 0.5,
              }}
              className="mx-auto w-full max-w-[480px] min-h-0 grid overflow-hidden"
            >
              <div className="min-h-0">
                <h2 className="font-serif text-2xl">
                  Choose your cookie preferences
                </h2>

                <div className="flex items-center justify-center flex-col text-center space-y-8 mt-6">
                  <div className="flex items-center justify-center space-y-2.5 flex-col">
                    <CheckButton
                      value={"allow_analytics_cookies"}
                      cookies={cookies}
                      handleCheck={handleCheckCookie}
                      disabled
                    />
                    <p className="uppercase tracking-widest font-semibold text-sm">
                      ESSENTIAL
                    </p>
                    <p className="text-xs">
                      Our website uses essential cookies that are required for
                      the website to function properly. Our website also uses
                      analytical, functionality and marketing cookies.
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-y-2.5 flex-col">
                    <CheckButton
                      value={"allow_analytics_cookies"}
                      cookies={cookies}
                      handleCheck={handleCheckCookie}
                    />
                    <p className="uppercase tracking-widest font-semibold text-sm">
                      Analytical or performance cookies
                    </p>
                    <p className="text-xs">
                      We use analytical cookies to measure how you use our
                      website and help improve enable.com.
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-y-2.5 flex-col">
                    <CheckButton
                      value={"allow_functional_cookies"}
                      cookies={cookies}
                      handleCheck={handleCheckCookie}
                    />
                    <p className="uppercase tracking-widest font-semibold">
                      Functionality cookies
                    </p>
                    <p className="text-xs">
                      These cookies let us save the choices you make and some of
                      the information you provide when browsing
                      enable.com. They do not track your browsing activity
                      on other websites. Without functional cookies,
                      enable.com may not work reliably.
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-y-2.5 flex-col text-sm">
                    <CheckButton
                      value={"allow_marketing_cookies"}
                      cookies={cookies}
                      handleCheck={handleCheckCookie}
                    />
                    <p className="uppercase tracking-widest font-semibold text-sm">
                      Marketing cookies
                    </p>
                    <p className="text-xs">
                      We use marketing cookies to display personalised messages
                      on the enable.com website and to show you
                      advertisements from us and selected third parties on other
                      sites you may visit. We work with approved partners to
                      deliver relevant content and to measure the effectiveness
                      of these advertisements.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              animate={{
                gridTemplateRows: "1fr",
              }}
              exit={{
                gridTemplateRows: "0fr",
              }}
              transition={{
                duration: 0.5,
              }}
              className="mx-auto max-w-[480px] w-full min-h-0 grid overflow-hidden"
            >
              <div className="min-h-0">
                <h2 className="font-serif text-2xl">
                  Welcome to Enable
                </h2>

                <p className="mt-8 mx-auto font-light leading-[1.37em]">
                  Our website uses essential cookies that are required for the
                  website to function properly. Our website also uses
                  analytical, functionality and marketing cookies.
                </p>
                <p className="mt-4">
                  For more information please see our{" "}
                  <a
                    href="/disclaimers"
                    className="group inline-flex items-center"
                  >
                    <HoverSlideText
                      text="Cookie Policy"
                      className="underline"
                      hoverClassName="underline text-[var(--color-primary-blue)]"
                    />
                  </a>
                  .
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex justify-between gap-x-1 lg:gap-x-10 mt-10">
          {customize ? (
            <>
              <CookiesButton
                label="Accept"
                onClick={() => handleSubmitCustomCookieConfig()}
              />
              <CookiesButton
                label="Reject"
                onClick={() => setCustomize(false)}
              />
            </>
          ) : (
            <>
              <CookiesButton
                label="Accept All"
                onClick={() => handleAcceptAll()}
              />
              <CookiesButton
                label="Reject All"
                onClick={() => handleRejectAll()}
              />
            </>
          )}
          <CookiesButton
            label="Customise"
            onClick={() => handleCustomize()}
            active={customize}
          />
        </div>
      </motion.div>
    </>
  );
}

const CookiesButton = ({
  label,
  onClick,
  active = false,
}: {
  label: string;
  onClick?: () => void;
  active?: boolean;
}) => {
  return (
    <button
      onMouseDown={onClick}
      className={`group cursor-pointer font-sans text-sm relative pb-2 px-0 text-left ${
        active ? "opacity-100" : "opacity-35 hover:opacity-100"
      } transition-opacity duration-300`}
    >
      <HoverSlideText
        text={label}
        wrapperClassName="whitespace-nowrap"
        className="uppercase tracking-widest font-semibold leading-[1.1]"
        hoverClassName="uppercase tracking-widest font-semibold leading-[1.1] text-[var(--color-primary-blue)]"
      />
      <i className="w-11 h-px bg-gold/35 block absolute bottom-0 left-0" />
    </button>
  );
};

const CheckButton = ({
  value,
  cookies,
  handleCheck,
  disabled = false,
}: {
  value: string;
  cookies: Cookie[];
  handleCheck: (key: string, value: string) => void;
  disabled?: boolean;
}) => {
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    const cookie = cookies.find((cookie) => cookie.name === value);
    if (cookie) {
      setChecked(cookie.value === "true");
    }
  }, [value, cookies]);

  const handleToggle = () => {
    if (!disabled) {
      setChecked(!checked);
      handleCheck(value, !checked ? "true" : "false");
    }
  };

  return (
    <div
      onMouseDown={() => handleToggle()}
      className={`mx-auto w-6 h-6 aspect-square rounded-full border border-gold flex items-center justify-center relative transition-colors duration-300 ${
        !disabled
          ? checked
            ? "bg-gold cursor-pointer"
            : "bg-transparent cursor-pointer"
          : "bg-gold cursor-auto"
      }`}
    >
      {!disabled ? (
        checked && (
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-1 border-l border-b border-white -rotate-[40deg]" />
        )
      ) : (
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-1 border-l border-b border-white -rotate-[40deg]" />
      )}
    </div>
  );
};
