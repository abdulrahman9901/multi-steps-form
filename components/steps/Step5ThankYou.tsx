export function Step5ThankYou() {
  return (
    <div className="step-content step-content--centered">
      <img
        src="/assets/images/icon-thank-you.svg"
        alt=""
        width={80}
        height={80}
        className="thank-you__icon"
      />
      <h1 className="step-title">Thank you!</h1>
      <p className="step-description thank-you__text">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at{" "}
        <a href="mailto:support@loremgaming.com" className="thank-you__link">
          support@loremgaming.com
        </a>
        .
      </p>
    </div>
  );
}
