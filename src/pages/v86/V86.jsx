import react, { useEffect, useState } from "react";
import { TS86Starter } from "../../ts-86/TS86Starter";
// import V86 from "./libv86";
// import V86 from "v86";

export const V86Component = () => {
  const [emulator, setV86instance] = useState("");
  useEffect(() => {
    const v86Starter = new TS86Starter({
      screenContainer: document.getElementById("screen_container"),

      // bios: {
      //   url: "../bios/seabios.bin",
      // },
      // vga_bios: {
      //   url: "../bios/vgabios.bin",
      // },
      // cdrom: {
      //   url: "../images/linux.iso",
      // },
      // autostart: true,
    });
    console.log("got a v86 starter");
    console.log(v86Starter);
    setV86instance(v86Starter);
  }, []);

  /* This is from the currrent docs, not the npm install
  useEffect(() => {
    const v86Starter = new V86.V86Starter({
      wasm_path: "../build/v86.wasm",
      memory_size: 512 * 1024 * 1024,
      vga_memory_size: 8 * 1024 * 1024,
      screen_container: document.getElementById("screen_container"),
      bios: {
        url: "../bios/seabios.bin",
      },
      vga_bios: {
        url: "../bios/vgabios.bin",
      },
      filesystem: {
        baseurl: "../images/arch/",
        basefs: "../images/fs.json",
      },
      autostart: true,
      bzimage_initrd_from_filesystem: true,
      cmdline: [
        "rw",
        "root=host9p rootfstype=9p rootflags=trans=virtio,cache=loose",
        "init=/usr/bin/init-openrc",
      ].join(" "),
    });
    setV86instance(v86Starter);
  }, [emulator]);
  */

  const saveFileHandler = () => {
    return {
      onclick() {
        console.log("starting saveFileHandler");

        emulator.save_state(function (error, new_state) {
          console.log("starting save_state");

          if (error) {
            console.log(error);
            throw error;
          }

          var a = document.createElement("a");
          a.download = "v86state.bin";
          a.href = window.URL.createObjectURL(new Blob([new_state]));
          a.dataset.downloadurl =
            "application/octet-stream:" + a.download + ":" + a.href;
          a.click();
        });

        this.blur();

        console.log("exiting saveFileHandler");
      },
    };
  };

  const restoreFileHandler = () => {
    return {
      onclick() {
        if (this.files.length) {
          var filereader = new FileReader();
          emulator.stop();

          filereader.onload = function (e) {
            emulator.restore_state(e.target.result);
            emulator.run();
          };

          filereader.readAsArrayBuffer(this.files[0]);

          this.value = "";
        }
        this.blur();
      },
    };
  };

  return (
    <>
      {!emulator ? (
        <>Loading ...</>
      ) : (
        <>
          <input
            id="save_file"
            type="button"
            value="Save state to file"
            onClick={saveFileHandler}
          />
          Restore from file:
          <input id="restore_file" type="file" onClick={restoreFileHandler} />
          <hr />
          <div id="screen_container">
            <div
              style={{
                whiteSpace: "pre",
                font: "14px monospace",
                lineHeight: "14px",
                width: "100%",
              }}
            ></div>
            <canvas style={{ display: "none" }}></canvas>
          </div>
        </>
      )}
    </>
  );
};

const StyledContainer = ``;
// white-space: pre; font: 14px monospace; line-height: 14px"
