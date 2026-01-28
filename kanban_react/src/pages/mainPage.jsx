function MainPage(){
  return(
    <div className="mainInner">
      <h1>Kanban board</h1>
      <div className="kanbanContainer">
        <div className="kanbanBox">
          <h2>To do</h2>
          <div className="kanbanItemBox">
            <div className="kanbanItem">
              <h3>kanban title</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, excepturi?</p>
              <span>created on</span>
            </div>
            <div className="kanbanItem">
              <h3>kanban title</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, excepturi?</p>
              <span>created on</span>
            </div>
          </div>
        </div>
        <div className="kanbanBox">
          <h2>In progress</h2>
          <div className="kanbanItemBox">
            <div className="kanbanItem">
              <h3>kanban title</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, excepturi?</p>
              <span>created on</span>
            </div>
          </div>
        </div>
        <div className="kanbanBox">
          <h2>Done</h2>
          <div className="kanbanItemBox">
            <div className="kanbanItem">
              <h3>kanban title</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, excepturi?</p>
              <span>created on</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage;