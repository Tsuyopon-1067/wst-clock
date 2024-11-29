type XShareButtonProps = {
  text: string;
};

export const XShareButton = ({ text }: XShareButtonProps) => {
  const handleShare = () => {
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text + "\nhttps://tsuyopon-1067.github.io/wst-clock/"
    )}`;
    window.open(shareUrl);
  };

  return (
    <button
      onClick={handleShare}
      className="bg-black rounded text-white p-2 font-bold"
    >
      Xでシェア
    </button>
  );
};
