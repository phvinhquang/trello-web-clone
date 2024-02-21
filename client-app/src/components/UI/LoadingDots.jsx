import classes from "./LoadingDots.module.css";

export default function LoadingDots() {
  return (
    <div className={classes.loading}>
      <div className="snippet" data-title="dot-elastic">
        <div className="stage">
          <p>Loading</p>
          <div className={classes["dot-elastic"]}></div>
        </div>
      </div>
    </div>
  );
}
