import React from "react";
import UbuntuApp from "../base/ubuntu_app";

export class AllApplications extends React.Component {
  constructor() {
    super();
    this.state = {
      query: "",
      apps: [],
      category: 0, // 0 for all 1 for frequent
    };
  }

  componentDidMount() {
    this.setState({
      apps: this.props.apps,
    });
  }

  handleChange = (e) => {
    this.setState({
      query: e.target.value,
      apps:
        e.target.value === "" || e.target.value === null
          ? this.props.apps
          : this.state.apps.filter((app) =>
              app.title.toLowerCase().includes(e.target.value.toLowerCase())
            ),
    });
  };

  renderApps = () => {
    let appsJsx = [];
    let frequentAppsInfo = JSON.parse(localStorage.getItem("frequentApps"));
    let getFrequentApps = () => {
      let frequentApps = [];
      frequentAppsInfo.forEach((app_info) => {
        let app = this.props.apps.find((app) => app.id === app_info.id);
        if (app) {
          frequentApps.push(app);
        }
      });
      return frequentApps;
    };

    let apps =
      this.state.category === 0 ? [...this.state.apps] : getFrequentApps();
    apps.forEach((app, index) => {
      const props = {
        name: app.title,
        id: app.id,
        icon: app.icon,
        openApp: this.props.openApp,
      };

      appsJsx.push(<UbuntuApp key={index} {...props} />);
    });
    return appsJsx;
  };

  handleSwitch = (category) => {
    if (category !== this.state.category) {
      this.setState({
        category: category,
      });
    }
  };

  render() {
    return (
      <div
        className={
          "absolute h-full w-full z-20 justify-center pl-20 border-black border-opacity-60 bg-black bg-opacity-70"
        }
      >
        <div className={"flex p-5 align-center justify-center"}>
          <div
            className={
              "flex w-1/4 h-full items-center pl-2 pr-2 bg-white border-black border-width-2 rounded-xl overflow-hidden "
            }
          >
            <img
              className={"w-5 h-5"}
              src={"/ubuntu/images/logos/search.png"}
              alt={"search"}
            />
            <input
              className={"w-3/4 p-1 bg-transparent focus:outline-none"}
              placeholder="Type to Search..."
              value={this.state.query}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div
          className={
            "grid grid-cols-6 grid-rows-3 gap-4 pl-20 pr-20 pt-10  justify-center"
          }
        >
          {this.renderApps()}
        </div>
        <div className={"flex p-2 justify-center fixed bottom-0 mb-15 w-full"}>
          <div
            className={
              "w-1/4 text-center text-white bg-transparent items-center"
            }
            onClick={this.handleSwitch.bind(this, 1)}
          >
            <h4>Frequent</h4>
            {this.state.category === 1 ? (
              <div className={"h-1 mt-1 bg-ub-orange self-center"} />
            ) : (
              <div className={"h-1 mt-1 bg-transparent hover:bg-white "} />
            )}
          </div>
          <div
            className={
              "w-1/4 text-center text-white bg-transparent items-center"
            }
            onClick={this.handleSwitch.bind(this, 0)}
          >
            <h4>All</h4>
            {this.state.category === 0 ? (
              <div className={"h-1 mt-1 bg-ub-orange"} />
            ) : (
              <div className={"h-1 mt-1 bg-transparent hover:bg-white"} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default AllApplications;
